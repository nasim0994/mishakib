import { z } from 'zod';

export const messageValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});
export const updateMessageValidation = messageValidation.partial();
