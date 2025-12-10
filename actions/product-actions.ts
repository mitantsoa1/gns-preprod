'use server';

import { Product } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
}
