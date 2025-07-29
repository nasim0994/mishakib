import { Types } from 'mongoose';

export type IProject = {
  name: string;
  thumbnail: string;
  galleries?: {
    title: string;
    link: string;
  }[];
  category: Types.ObjectId;
};
