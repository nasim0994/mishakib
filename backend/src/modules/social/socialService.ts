import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ISocial } from './socialInterface';
import { Social } from './socialModel';

export const addSocialService = async (data: ISocial) => {
  const result = await Social.create(data);
  return result;
};

export const getAllSocialService = async () => {
  const result = await Social.find();
  return result;
};

export const getSingleSocialService = async (id: string) => {
  const result = await Social.findById(id);
  return result;
};

export const updateSocialService = async (id: string, data: ISocial) => {
  const isExist = await Social.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');

  const result = await Social.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const deleteSocialService = async (id: string) => {
  const isExist = await Social.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');

  const result = await Social.findByIdAndDelete(id);
  return result;
};
