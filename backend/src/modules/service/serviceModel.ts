import { Schema, model } from 'mongoose';
import { IService } from './serviceInterface';

const serviceSchema = new Schema<IService>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Service = model<IService>('Service', serviceSchema);
