import httpStatus from 'http-status';
import {
  addAboutService,
  getAboutService,
  updateAboutService,
} from './aboutService';
import { catchAsync } from '../../utils/catchAsync';

export const addAboutController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addAboutService(data);

  res.status(200).json({
    success: true,
    message: 'About created successfully',
    data: result,
  });
});

export const getAboutController = catchAsync(async (req, res) => {
  const result = await getAboutService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'About get successfully!',
    data: result,
  });
});

export const updateAboutController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateAboutService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'About updated successfully',
    data: result,
  });
});
