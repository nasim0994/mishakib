import { Schema, model } from 'mongoose';
import { IAbout } from './aboutInterface';

const aboutSchema = new Schema<IAbout>(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    cv: { type: String },
  },
  { timestamps: true },
);

export const About = model<IAbout>('About', aboutSchema);
