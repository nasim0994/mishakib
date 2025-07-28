import httpStatus from 'http-status';
import {
  addLogoService,
  getLogoService,
  updateLogoService,
} from './logoService';
import { catchAsync } from '../../utils/catchAsync';

export const addLogoController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addLogoService(data);

  res.status(200).json({
    success: true,
    message: 'Logo created successfully',
    data: result,
  });
});

export const getLogoController = catchAsync(async (req, res) => {
  const result = await getLogoService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Logo get successfully!',
    data: result,
  });
});

export const updateLogoController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateLogoService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Logo updated successfully',
    data: result,
  });
});
