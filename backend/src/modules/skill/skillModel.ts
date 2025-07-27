import { Schema, model } from 'mongoose';
import { ISkill } from './skillInterface';

const skillSchema = new Schema<ISkill>(
  {
    sectionDescription: { type: String, required: true },
    skills: [
      {
        title: { type: String, required: true },
        logo: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const Skill = model<ISkill>('Skill', skillSchema);
