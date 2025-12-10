"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";

export type PaymentWithRelations = Prisma.PaymentGetPayload<{
  include: {
    user: true;
    product: true;
  };
}>;

/**
 * Fetches all payments from the database with user and product relations.
 */
export async function getPayments(): Promise<PaymentWithRelations[]> {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: true,
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return payments;
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    throw new Error("Could not fetch payments.");
  }
}
