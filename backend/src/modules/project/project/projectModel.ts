import { Schema, model } from 'mongoose';
import { IProject } from './projectInterface';

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    galleries: [
      {
        title: { type: String },
        link: { type: String },
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true },
);

export const Project = model<IProject>('Project', projectSchema);
