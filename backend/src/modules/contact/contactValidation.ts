import { z } from 'zod';

export const contactValidation = z.object({
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().min(1, 'Email is required'),
  address: z.string().min(1, 'Address is required'),
  whatsapp: z.string().min(1, 'WhatsApp is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});
export const updateContactValidation = contactValidation.partial();
