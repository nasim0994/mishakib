import { z } from 'zod';

export const counterValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  count: z.string().min(1, 'Count is required'),
});

export const updateCounterValidation = counterValidation.partial();
