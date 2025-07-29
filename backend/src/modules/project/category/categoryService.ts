import httpStatus from 'http-status';
import { ICategory } from './categoryInterface';
import { Category } from './categoryModel';
import AppError from '../../../errors/AppError';

export const addCategoryService = async (data: ICategory) => {
  const result = await Category.create(data);
  return result;
};

export const getAllCategoryService = async () => {
  const result = await Category.find();
  return result;
};

export const getSingleCategoryService = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

export const updateCategoryService = async (id: string, data: ICategory) => {
  const isExist = await Category.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');

  const result = await Category.findByIdAndUpdate(id, data, { new: true });
  return result;
};

export const deleteCategoryService = async (id: string) => {
  const isExist = await Category.findById(id);
  if (!isExist) throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');

  const result = await Category.findByIdAndDelete(id);
  return result;
};
