import { Schema, model } from 'mongoose';
import { ICategory } from './categoryInterface';

const categorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true, unique: true },
    order: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Category = model<ICategory>('Category', categorySchema);
