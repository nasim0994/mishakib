import { Schema, model } from 'mongoose';
import { IGallery } from './galleryInterface';

const gallerySchema = new Schema<IGallery>(
  {
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true },
);

export const Gallery = model<IGallery>('Gallery', gallerySchema);
