import { z } from 'zod';

export const socialValidation = z.object({
  icon: z.string().min(1, 'Icon is required'),
  link: z.string().url('Link must be a valid URL').min(1, 'Link is required'),
});
export const updateSocialValidation = socialValidation.partial();
