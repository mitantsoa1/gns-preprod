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

            // case 'payment_intent.succeeded': {
            //     const paymentIntent = event.data.object as Stripe.PaymentIntent;
            //     await handlePaymentIntentSucceeded(paymentIntent);
            //     break;
            // }

            // case 'payment_intent.payment_failed': {
            //     const paymentIntent = event.data.object as Stripe.PaymentIntent;
            //     await handlePaymentIntentFailed(paymentIntent);
            //     break;
            // }

            // case 'charge.succeeded': {
            //     const charge = event.data.object as Stripe.Charge;
            //     await handleChargeSucceeded(charge);
            //     break;
            // }

            // case 'charge.refunded': {
            //     const charge = event.data.object as Stripe.Charge;
            //     await handleChargeRefunded(charge);
            //     break;
            // }

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
        status: session.payment_status === 'paid' ? 'succeeded' : 'pending',
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
// async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
//     console.log('💰 Payment intent succeeded:', paymentIntent.id);

//     // Préparer les données minimales pour le paiement
//     const paymentData = {
//         stripePaymentIntentId: paymentIntent.id,
//         amount: Math.round(paymentIntent.amount / 100),
//         currency: paymentIntent.currency,
//         status: 'succeeded',
//         paymentMethod: paymentIntent.payment_method_types[0] || null,
//         paidAt: new Date(),
//         productName: 'Unknown Product', // Valeur par défaut
//         quantity: 1, // Valeur par défaut
//     };

//     try {
//         // Utiliser la même fonction utilitaire
//         const payment = await findOrCreatePayment(paymentData);
//         console.log('💾 Payment processed (intent):', {
//             id: payment.id,
//             sessionId: payment.stripeCheckoutSessionId,
//             intentId: payment.stripePaymentIntentId
//         });
//     } catch (error: any) {
//         console.error('❌ Error in handlePaymentIntentSucceeded:', error);

//         // Si erreur de contrainte unique, ignorer car sera gérée par checkout.session.completed
//         if (error.code === 'P2002') {
//             console.log('⚠️ Payment intent already exists, will be updated by session if needed');
//         } else {
//             throw error;
//         }
//     }
// }

// Handle payment intent failed - VERSION CORRIGÉE
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
    console.log('❌ Payment intent failed:', paymentIntent.id);

    const paymentData = {
        stripePaymentIntentId: paymentIntent.id,
        amount: Math.round(paymentIntent.amount / 100),
        currency: paymentIntent.currency,
        status: 'failed',
        paymentMethod: paymentIntent.payment_method_types[0] || null,
        failureReason: paymentIntent.last_payment_error?.message || 'Payment failed',
        productName: 'Unknown Product',
        quantity: 1,
    };

    try {
        const payment = await findOrCreatePayment(paymentData);
        console.log('💾 Failed payment processed:', payment.id);
    } catch (error: any) {
        console.error('❌ Error in handlePaymentIntentFailed:', error);
        if (error.code !== 'P2002') throw error;
    }
}

// Handle charge succeeded
async function handleChargeSucceeded(charge: Stripe.Charge) {
    console.log('✅ Charge succeeded:', charge.id);

    if (!charge.payment_intent) return;

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
            await prisma.payment.update({
                where: { id: existingPayment.id },
                data: {
                    stripeChargeId: charge.id,
                    receiptUrl: charge.receipt_url || null,
                },
            });
            console.log('💾 Payment updated with charge details:', existingPayment.id);
        }
    } catch (error) {
        console.error('❌ Error updating charge details:', error);
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
            await prisma.payment.update({
                where: { id: existingPayment.id },
                data: {
                    status: 'refunded',
                    refundedAt: new Date(),
                },
            });
            console.log('💾 Payment marked as refunded:', existingPayment.id);
        }
    } catch (error) {
        console.error('❌ Error updating refund status:', error);
    }
}

// Gestion des erreurs de contrainte unique
async function handleUniqueConstraintError(paymentData: any) {
    console.log('🔄 Handling unique constraint error...');

    // try {
    //     // Essayer de trouver l'enregistrement existant
    //     const existing = await prisma.payment.findFirst({
    //         where: {
    //             OR: [
    //                 { stripePaymentIntentId: paymentData.stripePaymentIntentId },
    //                 { stripeCheckoutSessionId: paymentData.stripeCheckoutSessionId }
    //             ]
    //         }
    //     });

    //     if (existing) {
    //         // Mettre à jour avec les nouvelles données
    //         const updateData: any = { ...paymentData };

    //         // Ne pas écraser les identifiants existants avec null
    //         if (!updateData.stripePaymentIntentId && existing.stripePaymentIntentId) {
    //             updateData.stripePaymentIntentId = existing.stripePaymentIntentId;
    //         }
    //         if (!updateData.stripeCheckoutSessionId && existing.stripeCheckoutSessionId) {
    //             updateData.stripeCheckoutSessionId = existing.stripeCheckoutSessionId;
    //         }

    //         await prisma.payment.update({
    //             where: { id: existing.id },
    //             data: updateData
    //         });
    //         console.log('🔧 Duplicate payment resolved by update:', existing.id);
    //     }
    // } catch (error) {
    //     console.error('❌ Failed to resolve unique constraint:', error);
    // }
}