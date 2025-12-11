'use server';

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/get-session";
import { getLocale } from "next-intl/server";

export type DashboardData = {
    stats: {
        totalRevenue: string; // Changed from activeProjects
        pendingQuotes: number;
        completedPayments: number; // Changed from completedSites
        averagePayment: string; // Changed from clientSatisfaction
    };
    payments: any[]; // Changed from projects
    quotes: any[];
    activities: any[];
};

export async function getUserDashboardData(): Promise<DashboardData> {
    const session = await getSession();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;
    const locale = await getLocale();

    // Fetch all payments for the user
    // We can filter by paid or not paid to distinguish between 'payments' and 'quotes' if desired
    // Or we show ALL payments in the table
    const paymentsRaw = await prisma.payment.findMany({
        where: { userId },
        include: { product: true },
        orderBy: { createdAt: 'desc' }
    });

    // --- MAPPING LOGIC ---

    // 1. Payments: All payments that are succeeded
    const succeededPayments = paymentsRaw.filter(p => p.status === 'succeeded');

    // Map to Payment format
    const payments = succeededPayments.map(p => ({
        id: p.id,
        product: p.productName || p.product?.name || "Produit inconnu",
        amount: new Intl.NumberFormat(locale, { style: 'currency', currency: p.currency }).format(p.amount / 100),
        date: p.paidAt ? p.paidAt.toLocaleDateString() : p.createdAt.toLocaleDateString(),
        status: "Payé",
        method: p.paymentMethod || "Carte"
    }));

    // 2. Quotes: Pending payments (initially created but not paid)
    const pendingPayments = paymentsRaw.filter(p => p.status !== 'succeeded');

    // Map to Quote format
    const quotes = pendingPayments.map(p => ({
        id: p.id.substring(0, 8).toUpperCase(), // Short ID
        client: p.customerName || "Moi",
        project: p.productName || p.product?.name || "Devis",
        amount: new Intl.NumberFormat(locale, { style: 'currency', currency: p.currency }).format(p.amount / 100),
        date: p.createdAt.toISOString().split('T')[0],
        status: p.status === 'pending' ? 'En attente' : 'Action requise',
        validUntil: new Date(p.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // +30 days
    }));

    // 3. Stats
    const totalRevenueVal = succeededPayments.reduce((acc, curr) => acc + (curr.amount / 100), 0);
    // Average payment amount
    const avgPaymentVal = succeededPayments.length > 0 ? totalRevenueVal / succeededPayments.length : 0;

    const stats = {
        totalRevenue: new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(totalRevenueVal),
        pendingQuotes: quotes.length,
        completedPayments: succeededPayments.length,
        averagePayment: new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(avgPaymentVal)
    };

    // 4. Activities (Derived from payments)
    const activities = paymentsRaw.slice(0, 5).map((p, index) => ({
        id: index,
        type: p.status === 'succeeded' ? 'delivery' : 'quote',
        title: p.status === 'succeeded' ? 'Paiement effectué' : 'Devis créé',
        description: `${p.productName} - ${new Intl.NumberFormat(locale, { style: 'currency', currency: p.currency }).format(p.amount / 100)}`,
        time: new Date(p.createdAt).toLocaleDateString(),
        icon: null, // Component will handle icon
        color: p.status === 'succeeded' ? "text-green-500 bg-green-100" : "text-yellow-500 bg-yellow-100"
    }));

    return {
        stats,
        payments,
        quotes,
        activities
    };
}
