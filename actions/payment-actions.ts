"use server";

import { auth } from "@/lib/auth";
import { Prisma } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export type PaymentWithRelations = Prisma.PaymentGetPayload<{
  include: {
    user: true;
    product: true;
  };
}>;

/**
 * Fetches all payments from the database with user and product relations.
 */
// Dans un server action avec validation

export async function getPayments(): Promise<PaymentWithRelations[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  try {
    const payments = await prisma.payment.findMany({
      where: {
        userId: session.user.id,
      },
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
    console.error("Failed to fetch user payments:", error);
    throw new Error("Could not fetch payments.");
  }
}
