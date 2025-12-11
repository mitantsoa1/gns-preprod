import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
        return new NextResponse('Missing stripe-signature header', { status: 400 });
    }

    let event: Stripe.Event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('⚠️  Webhook signature verification failed:', err.message);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutSessionCompleted(session);
                break;
            }

            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await handlePaymentIntentSucceeded(paymentIntent);
                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await handlePaymentIntentFailed(paymentIntent);
                break;
            }

            case 'charge.succeeded': {
                const charge = event.data.object as Stripe.Charge;
                await handleChargeSucceeded(charge);
                break;
            }

            case 'charge.refunded': {
                const charge = event.data.object as Stripe.Charge;
                await handleChargeRefunded(charge);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Error processing webhook:', error);
        return new NextResponse(`Webhook handler failed: ${error.message}`, { status: 500 });
    }
}

// Fonction utilitaire pour trouver ou créer un paiement
async function findOrCreatePayment(paymentData: any) {
    // Chercher par les deux identifiants
    const existing = await prisma.payment.findFirst({
        where: {
            OR: [
                { stripePaymentIntentId: paymentData.stripePaymentIntentId },
                { stripeCheckoutSessionId: paymentData.stripeCheckoutSessionId }
            ]
        }
    });

    if (existing) {
        // Fusionner les données
        const mergedData = {
            ...existing,
            ...paymentData,
            // Ne pas écraser les valeurs non nulles existantes avec null
            stripePaymentIntentId: paymentData.stripePaymentIntentId || existing.stripePaymentIntentId,
            stripeCheckoutSessionId: paymentData.stripeCheckoutSessionId || existing.stripeCheckoutSessionId,
        };

        return await prisma.payment.update({
            where: { id: existing.id },
            data: mergedData
        });
    }

    // Créer un nouveau paiement
    return await prisma.payment.create({
        data: paymentData
    });
}

// Handle checkout session completed - VERSION CORRIGÉE
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    console.log('✅ Checkout session completed:', session.id);

    const metadata = session.metadata || {};
    const userId = metadata.userId || null;
    const productId = metadata.productId || null;

    let productName = metadata.productName || 'Unknown Product';

    // 1. Récupérer le produit depuis la base de données pour avoir le nom canonique
    if (productId) {
        const product = await prisma.product.findUnique({
            where: { id: productId },
            select: { name: true },
        });
        if (product) {
            productName = product.name;
        }
    }

    // 2. Récupérer les line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
    const firstItem = lineItems.data[0];

    // 3. Si produit non trouvé, utiliser la description de Stripe
    if (!productId && firstItem?.description) {
        productName = firstItem.description;
    }

    // Préparer les données du paiement
    const paymentData = {
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string | null,
        amount: Math.round((session.amount_total || 0) / 100),
        currency: session.currency || 'eur',
        status: session.payment_status === 'paid' ? 'succeeded' : 'failed',
        paymentMethod: session.payment_method_types?.[0] || null,
        customerEmail: session.customer_details?.email || null,
        customerName: session.customer_details?.name || null,
        productId: productId,
        productName: productName,
        quantity: firstItem?.quantity || parseInt(metadata.quantity || '1'),
        userId: userId,
        metadata: metadata as any,
        paidAt: session.payment_status === 'paid' ? new Date() : null,
    };

    try {
        // Utiliser la fonction utilitaire pour éviter les conflits
        const payment = await findOrCreatePayment(paymentData);
        console.log('💾 Payment processed (session):', {
            id: payment.id,
            sessionId: payment.stripeCheckoutSessionId,
            // intentId: payment.stripePaymentIntentId
        });
    } catch (error: any) {
        console.error('❌ Error in handleCheckoutSessionCompleted:', error);

        // Si erreur de contrainte unique, essayer une stratégie de récupération
        if (error.code === 'P2002') {
            // await handleUniqueConstraintError(paymentData);
        } else {
            throw error;
        }
    }
}

// Handle payment intent succeeded - VERSION CORRIGÉE
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    console.log('💰 Payment intent succeeded:', paymentIntent.id);

    try {
        // 1. D'abord essayer de trouver un paiement existant par payment_intent_id
        const existingPayment = await prisma.payment.findFirst({
            where: {
                stripePaymentIntentId: paymentIntent.id
            },
        });

        // 3. Si un paiement existe, le mettre à jour
        if (existingPayment) {
            await prisma.payment.update({
                where: { id: existingPayment.id },
                data: {
                    status: 'succeeded',
                    paidAt: new Date(),
                    paymentMethod: paymentIntent.payment_method_types[0] || existingPayment.paymentMethod,
                    // Optionnel: mettre à jour d'autres champs si nécessaire
                    amount: Math.round(paymentIntent.amount / 100) || existingPayment.amount,
                    currency: paymentIntent.currency || existingPayment.currency,
                },
            });
            // ICI: Déclencher les actions post-paiement (livraison, accès, etc.)
            await triggerPostPaymentActions(existingPayment);

        } else {
            // 4. Si aucun paiement n'existe encore (cas rare), attendre checkout.session.completed
            console.log('⚠️ No payment record found for intent, waiting for checkout.session.completed:', paymentIntent.id);

        }

    } catch (error: any) {
        console.error('❌ Error in handlePaymentIntentSucceeded:', error);
    }
}

// Fonction utilitaire pour les actions post-paiement
async function triggerPostPaymentActions(payment: any) {
    try {
        console.log('🚀 Triggering post-payment actions for payment:', payment.id);

        // 1. Mettre à jour le produit/commande
        if (payment.productId) {
            // Exemple: marquer le produit comme vendu, créer une licence, etc.
            // await prisma.product.update({...});
        }

        // 2. Envoyer un email de confirmation
        if (payment.customerEmail) {
            // await sendConfirmationEmail(payment.customerEmail, payment);
        }

        // 3. Donner accès au produit/service
        // await grantProductAccess(payment.userId, payment.productId);

        // 4. Envoyer une notification interne
        // await sendInternalNotification(payment);

        console.log('✅ Post-payment actions completed for:', payment.id);
    } catch (error) {
        console.error('❌ Error in post-payment actions:', error);
        // Ne pas bloquer le flux principal, juste logger
    }
}

// Handle payment intent failed - VERSION CORRIGÉE
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
    console.log('❌ Payment intent failed:', paymentIntent.id);

    const existingPayment = await prisma.payment.findFirst({
        where: {
            stripePaymentIntentId: paymentIntent.id
        },
    });

    if (existingPayment) {
        await prisma.payment.update({
            where: { id: existingPayment.id },
            data: {
                status: 'failed',
                failureReason: paymentIntent.last_payment_error?.message || 'Payment failed',
                paidAt: new Date(),
                paymentMethod: paymentIntent.payment_method_types[0] || existingPayment.paymentMethod,
                // Optionnel: mettre à jour d'autres champs si nécessaire
                amount: Math.round(paymentIntent.amount / 100) || existingPayment.amount,
                currency: paymentIntent.currency || existingPayment.currency,
            },
        });
        // ICI: Déclencher les actions post-paiement (livraison, accès, etc.)
        await triggerPostPaymentActions(existingPayment);

    } else {
        // 4. Si aucun paiement n'existe encore (cas rare), attendre checkout.session.completed
        console.log('⚠️ No payment record found for intent, waiting for checkout.session.completed:', paymentIntent.id);


    }

}

// Handle charge succeeded
async function handleChargeSucceeded(charge: Stripe.Charge) {
    console.log('✅ Charge succeeded:', charge.id);

    if (!charge.payment_intent) {
        console.warn('⚠️ Charge without payment_intent:', charge.id);
        return;
    }

    try {
        const existingPayment = await prisma.payment.findFirst({
            where: {
                OR: [
                    { stripePaymentIntentId: charge.payment_intent as string },
                    { stripeChargeId: charge.id }
                ]
            },
        });

        if (existingPayment) {
            // Préparer les données de mise à jour
            const updateData: any = {
                stripeChargeId: charge.id,
                receiptUrl: charge.receipt_url || existingPayment.receiptUrl,
                amountCaptured: charge.amount_captured ? Math.round(charge.amount_captured / 100) : existingPayment.amountCaptured,
                capturedAt: charge.captured ? new Date() : existingPayment.capturedAt,
                disputed: charge.disputed || existingPayment.disputed,
                // invoiceId: charge.inv || existingPayment.invoiceId,
            };

            // Mettre à jour les URLs si disponibles
            if (charge.receipt_url && !charge.receipt_url.includes('null')) {
                updateData.receiptUrl = charge.receipt_url;
            }

            // if (charge.invoice) {
            //     updateData.invoiceUrl = `https://invoice.stripe.com/i/${charge.invoice}`;
            // }

            // Si le paiement est contesté, mettre à jour le statut
            if (charge.disputed) {
                updateData.status = 'disputed';
                // Vous pourriez vouloir récupérer plus de détails sur la contestation
                // via l'événement charge.dispute.created
            }

            await prisma.payment.update({
                where: { id: existingPayment.id },
                data: updateData,
            });

            // Si c'est la première capture, déclencher les actions
            if (charge.captured && !existingPayment.capturedAt) {
                await triggerPostCaptureActions(existingPayment, charge);
            }
        } else {
            console.warn('⚠️ No payment found for charge:', charge.id);

            // Option: Créer un paiement minimal si vraiment nécessaire
            // await createMinimalPaymentFromCharge(charge);
        }
    } catch (error) {
        console.error('❌ Error updating charge details:', error);
        // Ne pas throw pour éviter que Stripe retente trop de fois
        // Mais logguer pour debugging
    }
}

// Handle charge refunded
async function handleChargeRefunded(charge: Stripe.Charge) {
    console.log('🔄 Charge refunded:', charge.id);

    try {
        const existingPayment = await prisma.payment.findFirst({
            where: {
                OR: [
                    { stripeChargeId: charge.id },
                    { stripePaymentIntentId: charge.payment_intent as string }
                ]
            },
        });

        if (existingPayment) {
            const totalAmount = existingPayment.amount;
            const amountRefunded = Math.round(charge.amount_refunded / 100);
            const previouslyRefunded = existingPayment.amountRefunded || 0;
            const totalRefunded = previouslyRefunded + amountRefunded;

            // Déterminer le statut
            let status = 'refunded';
            if (totalRefunded < totalAmount) {
                status = 'partially_refunded';
                console.log(`💰 Partial refund: ${totalRefunded}/${totalAmount}`);
            }

            // Préparer les données de mise à jour
            const updateData: any = {
                status: status,
                amountRefunded: totalRefunded,
                refundedAt: new Date(),
                disputed: charge.disputed || existingPayment.disputed,
            };

            // Si contesté, mettre à jour la raison
            if (charge.disputed) {
                try {
                    // Cast to any because 'dispute' might be missing from the Charge type definition
                    const disputeField = (charge as any).dispute;
                    if (disputeField) {
                        const dispute = typeof disputeField === 'string'
                            ? await stripe.disputes.retrieve(disputeField)
                            : disputeField;
                        updateData.disputeReason = dispute.reason || 'disputed';
                    }
                } catch (disputeError) {
                    console.warn('⚠️ Could not retrieve dispute details:', disputeError);
                }
            }

            await prisma.payment.update({
                where: { id: existingPayment.id },
                data: updateData,
            });


            // Déclencher les actions de remboursement
            await triggerRefundActions(existingPayment, charge, status);
        } else {
            console.warn('⚠️ No payment found for refunded charge:', charge.id);
        }
    } catch (error) {
        console.error('❌ Error updating refund status:', error);
    }
}

// Fonctions auxiliaires

async function triggerPostCaptureActions(payment: any, charge: Stripe.Charge) {
    try {
        console.log('🚀 Triggering post-capture actions for payment:', payment.id);

        // 1. Donner accès au produit/service
        if (payment.productId && payment.userId) {
            // await grantProductAccess(payment.userId, payment.productId);
        }

        // 2. Envoyer un email de confirmation avec reçu
        if (payment.customerEmail && charge.receipt_url) {
            // await sendPaymentConfirmationEmail(payment.customerEmail, {
            //     receiptUrl: charge.receipt_url,
            //     amount: payment.amount,
            //     productName: payment.productName
            // });
        }

        // 3. Mettre à jour les statistiques
        // await updateSalesAnalytics(payment);

        console.log('✅ Post-capture actions completed');
    } catch (error) {
        console.error('❌ Error in post-capture actions:', error);
        // Ne pas bloquer le flux principal
    }
}

async function triggerRefundActions(payment: any, charge: Stripe.Charge, status: string) {
    try {
        console.log('🔄 Triggering refund actions for payment:', payment.id);

        // 1. Retirer l'accès au produit/service
        if (status === 'refunded' && payment.productId && payment.userId) {
            // Pour un remboursement complet
            // await revokeProductAccess(payment.userId, payment.productId);
        } else if (status === 'partially_refunded') {
            // Pour un remboursement partiel, logique spécifique
            // await handlePartialRefund(payment, charge);
        }

        // 2. Envoyer un email de confirmation de remboursement
        if (payment.customerEmail) {
            const refundAmount = Math.round(charge.amount_refunded / 100);
            // await sendRefundConfirmationEmail(payment.customerEmail, {
            //     refundAmount: refundAmount,
            //     totalAmount: payment.amount,
            //     status: status,
            //     paymentId: payment.id
            // });
        }

        // 3. Notifier l'équipe support
        // await notifySupportTeam(payment, 'refund', status);

        // 4. Mettre à jour les statistiques de remboursement
        // await updateRefundAnalytics(payment, status);

        console.log('✅ Refund actions completed:', status);
    } catch (error) {
        console.error('❌ Error in refund actions:', error);
    }
}

// Fonction pour créer un paiement minimal depuis une charge (fallback)
// async function createMinimalPaymentFromCharge(charge: Stripe.Charge) {
//     try {
//         // Seulement si on a des informations minimales
//         if (!charge.payment_intent && !charge.customer) return;

//         const metadata = charge.metadata || {};

//         const payment = await prisma.payment.create({
//             data: {
//                 stripeChargeId: charge.id,
//                 stripePaymentIntentId: charge.payment_intent as string || null,
//                 amount: Math.round(charge.amount / 100),
//                 currency: charge.currency,
//                 status: charge.refunded ? 'refunded' :
//                     charge.disputed ? 'disputed' :
//                         charge.paid ? 'succeeded' : 'pending',
//                 paymentMethod: charge.payment_method_details?.type || null,
//                 customerEmail: charge.billing_details?.email || null,
//                 customerName: charge.billing_details?.name || null,
//                 productId: metadata.productId || null,
//                 productName: metadata.productName || charge.description || 'Unknown Product',
//                 quantity: parseInt(metadata.quantity || '1'),
//                 amountRefunded: charge.amount_refunded ? Math.round(charge.amount_refunded / 100) : null,
//                 receiptUrl: charge.receipt_url || null,
//                 // invoiceId: charge.invoice || null,
//                 disputed: charge.disputed || false,
//                 paidAt: charge.created ? new Date(charge.created * 1000) : null,
//                 refundedAt: charge.amount_refunded ? new Date() : null,
//                 metadata: metadata,
//             },
//         });

//         console.log('💾 Created minimal payment from charge:', payment.id);
//         return payment;
//     } catch (error) {
//         console.error('❌ Error creating payment from charge:', error);
//         return null;
//     }
// }