import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ICounter } from './counterInterface';
import { Counter } from './counterModel';

export const addCounterService = async (data: ICounter) => {
  const result = await Counter.create(data);
  return result;
};

export const getAllCounterService = async () => {
  const result = await Counter.find();
  return result;
};

export const getSingleCounterService = async (id: string) => {
  const result = await Counter.findById(id);
  return result;
};

export const updateCounterService = async (id: string, data: ICounter) => {
  const isExist = await Counter.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Counter not found!');

  const result = await Counter.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const deleteCounterService = async (id: string) => {
  const isExist = await Counter.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Counter not found!');

  const result = await Counter.findByIdAndDelete(id);
  return result;
};
