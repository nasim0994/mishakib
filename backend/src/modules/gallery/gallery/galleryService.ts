import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { IGallery } from './galleryInterface';
import { Gallery } from './galleryModel';

export const addGalleryService = async (data: IGallery) => {
  const result = await Gallery.create(data);
  return result;
};

export const getAllGalleryService = async () => {
  const result = await Gallery.find().populate('category', 'title');
  return result;
};

export const getSingleGalleryService = async (id: string) => {
  const result = await Gallery.findById(id);
  return result;
};

export const updateGalleryService = async (id: string, data: IGallery) => {
  const isExist = await Gallery.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Gallery not found!');

  const result = await Gallery.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const deleteGalleryService = async (id: string) => {
  const isExist = await Gallery.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Gallery not found!');

  const result = await Gallery.findByIdAndDelete(id);
  return result;
};
