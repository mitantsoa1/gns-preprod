import { z } from 'zod';

export const checkoutSchema = z.object({
  planId: z.string(),
  quantity: z.number().min(1),
});
