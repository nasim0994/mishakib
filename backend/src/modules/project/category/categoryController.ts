import httpStatus from 'http-status';
import {
  addCategoryService,
  deleteCategoryService,
  getAllCategoryService,
  getSingleCategoryService,
  updateCategoryService,
} from './categoryService';
import { catchAsync } from '../../../utils/catchAsync';

export const addCategoryController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addCategoryService(data);

  res.status(200).json({
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

export const getAllCategoryController = catchAsync(async (req, res) => {
  const result = await getAllCategoryService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories get successfully!',
    data: result,
  });
});

export const getSingleCategoryController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleCategoryService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category get successfully',
    data: result,
  });
});

export const updateCategoryController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateCategoryService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    data: result,
  });
});

export const deleteCategoryController = catchAsync(async (req, res) => {
  const id = req.params.id;
  await deleteCategoryService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
  });
});
