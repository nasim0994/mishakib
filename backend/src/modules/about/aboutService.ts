import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IAbout } from './aboutInterface';
import { About } from './aboutModel';

export const addAboutService = async (data: IAbout) => {
  const isExist = await About.findOne();
  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'About information already exists!',
    );
  }
  const result = await About.create(data);
  return result;
};

export const getAboutService = async () => {
  const result = await About.findOne();
  return result;
};

export const updateAboutService = async (id: string, data: IAbout) => {
  const result = await About.findByIdAndUpdate(id, data, { new: true });
  return result;
};
