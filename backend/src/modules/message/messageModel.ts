import { Schema, model } from 'mongoose';
import { IMessage } from './messageInterface';

const messageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

export const Message = model<IMessage>('Message', messageSchema);
