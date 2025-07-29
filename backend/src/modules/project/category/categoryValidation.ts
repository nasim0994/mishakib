import { z } from 'zod';

export const categoryValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  order: z.number().int().min(0, 'Order must be a non-negative integer'),
});
export const updateCategoryValidation = categoryValidation.partial();
