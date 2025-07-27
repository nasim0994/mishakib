import { Schema, model } from 'mongoose';
import { IContact } from './contactInterface';

const contactSchema = new Schema<IContact>(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    whatsapp: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Contact = model<IContact>('Contact', contactSchema);
