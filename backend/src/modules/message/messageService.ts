import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IMessage } from './messageInterface';
import { Message } from './messageModel';

export const addMessageService = async (data: IMessage) => {
  const result = await Message.create(data);
  return result;
};

export const getAllMessageService = async () => {
  const result = await Message.find();
  return result;
};

export const getSingleMessageService = async (id: string) => {
  const result = await Message.findById(id);
  return result;
};

export const updateMessageService = async (id: string, data: IMessage) => {
  const isExist = await Message.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');

  const result = await Message.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const deleteMessageService = async (id: string) => {
  const isExist = await Message.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');

  const result = await Message.findByIdAndDelete(id);
  return result;
};
