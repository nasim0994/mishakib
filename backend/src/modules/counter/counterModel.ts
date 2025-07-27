import { Schema, model } from 'mongoose';
import { ICounter } from './counterInterface';

const counterSchema = new Schema<ICounter>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Counter = model<ICounter>('Counter', counterSchema);
