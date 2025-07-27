import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import {
  addServiceService,
  deleteServiceService,
  getAllServiceService,
  getSingleServiceService,
  updateServiceService,
} from './serviceService';

export const addServiceController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addServiceService(data);

  res.status(200).json({
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

export const getAllServiceController = catchAsync(async (req, res) => {
  const result = await getAllServiceService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services get successfully!',
    data: result,
  });
});

export const getSingleServiceController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleServiceService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service get successfully',
    data: result,
  });
});

export const updateServiceController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateServiceService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result,
  });
});

export const deleteServiceController = catchAsync(async (req, res) => {
  const id = req.params.id;
  await deleteServiceService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
  });
});
