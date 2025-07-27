import { z } from 'zod';

export const galleryValidation = z.object({
  image: z.string().min(1, 'Image is required'),
  category: z.string().min(1, 'Category is required'),
});
export const updateGalleryValidation = galleryValidation.partial();
