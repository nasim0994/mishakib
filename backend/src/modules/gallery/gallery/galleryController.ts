import httpStatus from 'http-status';
import {
  addGalleryService,
  deleteGalleryService,
  getAllGalleryService,
  getSingleGalleryService,
  updateGalleryService,
} from './galleryService';
import { catchAsync } from '../../../utils/catchAsync';

export const addGalleryController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addGalleryService(data);

  res.status(200).json({
    success: true,
    message: 'Gallery created successfully',
    data: result,
  });
});

export const getAllGalleryController = catchAsync(async (req, res) => {
  const result = await getAllGalleryService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories get successfully!',
    data: result,
  });
});

export const getSingleGalleryController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleGalleryService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Gallery get successfully',
    data: result,
  });
});

export const updateGalleryController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateGalleryService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Gallery updated successfully',
    data: result,
  });
});

export const deleteGalleryController = catchAsync(async (req, res) => {
  const id = req.params.id;
  await deleteGalleryService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Gallery deleted successfully',
  });
});
