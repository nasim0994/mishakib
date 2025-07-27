import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IService } from './serviceInterface';
import { Service } from './serviceModel';

export const addServiceService = async (data: IService) => {
  const result = await Service.create(data);
  return result;
};

export const getAllServiceService = async () => {
  const result = await Service.find();
  return result;
};

export const getSingleServiceService = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

export const updateServiceService = async (id: string, data: IService) => {
  const isExist = await Service.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');

  const result = await Service.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const deleteServiceService = async (id: string) => {
  const isExist = await Service.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');

  const result = await Service.findByIdAndDelete(id);
  return result;
};
