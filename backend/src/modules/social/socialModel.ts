import { Schema, model } from 'mongoose';
import { ISocial } from './socialInterface';

const socialSchema = new Schema<ISocial>(
  {
    icon: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true },
);

export const Social = model<ISocial>('Social', socialSchema);
