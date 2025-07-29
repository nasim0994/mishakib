import { z } from 'zod';

export const projectValidation = z.object({
  name: z.string().min(1, 'Name is required'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  category: z.string().min(1, 'Category is required'),
});
export const updateProjectValidation = projectValidation.partial();
