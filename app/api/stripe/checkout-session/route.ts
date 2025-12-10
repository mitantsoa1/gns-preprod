import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';
import { getLocale } from 'next-intl/server';
import { getUser } from '@/lib/get-session';

export async function POST(req: NextRequest) {
    const { productId } = await req.json();
    const locale = await getLocale();
    const user = await getUser();

    if (!productId) {
        return new NextResponse('Product ID is required', { status: 400 });
    }

    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (!product) {
        return new NextResponse('Product not found', { status: 404 });
    }

    if (!user) {
        return new NextResponse('User not found', { status: 404 });
    }

    try {
        // Note: Assumes product.price is a numeric value.
        // Stripe requires the amount in the smallest currency unit (e.g., cents for EUR).
        const unitAmount = Math.round(product.price * 100);

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: product.name,
                            description: product.description ?? undefined,
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            // Add metadata for webhook processing
            metadata: {
                productId: product.id,
                productName: product.name,
                userId: user.id,
            },
            // Optionally collect customer email
            customer_email: user.email, // Can be set if user is logged in
            // Make sure to set these URLs in your Stripe dashboard if they are static
            // Or handle them dynamically here
            success_url: `${req.nextUrl.origin}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.nextUrl.origin}/${locale}/cancel`,
        });

        return NextResponse.json({ session: checkoutSession });

    } catch (error: any) {
        console.error('Error creating Stripe session:', error);
        return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
    }
}