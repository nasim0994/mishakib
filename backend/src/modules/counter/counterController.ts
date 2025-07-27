import httpStatus from 'http-status';
import {
  addCounterService,
  deleteCounterService,
  getAllCounterService,
  getSingleCounterService,
  updateCounterService,
} from './counterService';
import { catchAsync } from '../../utils/catchAsync';

export const addCounterController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addCounterService(data);

  res.status(200).json({
    success: true,
    message: 'Counter created successfully',
    data: result,
  });
});

export const getAllCounterController = catchAsync(async (req, res) => {
  const result = await getAllCounterService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Counters get successfully!',
    data: result,
  });
});

export const getSingleCounterController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleCounterService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Counter get successfully',
    data: result,
  });
});

export const updateCounterController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateCounterService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Counter updated successfully',
    data: result,
  });
});

export const deleteCounterController = catchAsync(async (req, res) => {
  const id = req.params.id;
  await deleteCounterService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Counter deleted successfully',
  });
});
