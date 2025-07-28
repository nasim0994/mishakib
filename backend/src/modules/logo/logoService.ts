import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ILogo } from './logoInterface';
import { Logo } from './logoModel';

export const addLogoService = async (data: ILogo) => {
  const isExist = await Logo.findOne();
  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Logo information already exists!',
    );
  }
  const result = await Logo.create(data);
  return result;
};

export const getLogoService = async () => {
  const result = await Logo.findOne();
  return result;
};

export const updateLogoService = async (id: string, data: ILogo) => {
  const isExist = await Logo.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Logo not found!');

  const result = await Logo.findByIdAndUpdate(id, data, { new: true });
  return result;
};
