import { Types } from 'mongoose';

export type IGallery = {
  image: string;
  category: Types.ObjectId;
};
