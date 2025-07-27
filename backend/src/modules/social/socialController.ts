import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import {
  addSocialService,
  deleteSocialService,
  getAllSocialService,
  getSingleSocialService,
  updateSocialService,
} from './socialService';

export const addSocialController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addSocialService(data);

  res.status(200).json({
    success: true,
    message: 'Social created successfully',
    data: result,
  });
});

export const getAllSocialController = catchAsync(async (req, res) => {
  const result = await getAllSocialService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services get successfully!',
    data: result,
  });
});

export const getSingleSocialController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleSocialService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Social get successfully',
    data: result,
  });
});

export const updateSocialController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateSocialService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Social updated successfully',
    data: result,
  });
});

export const deleteSocialController = catchAsync(async (req, res) => {
  const id = req.params.id;
  await deleteSocialService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Social deleted successfully',
  });
});
