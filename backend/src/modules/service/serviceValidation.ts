import { z } from 'zod';

export const serviceValidation = z.object({
  icon: z.string().min(1, 'Icon is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});
export const updateServiceValidation = serviceValidation.partial();
