import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import {
  addMessageService,
  deleteMessageService,
  getAllMessageService,
  getSingleMessageService,
  updateMessageService,
} from './messageService';

export const addMessageController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addMessageService(data);

  res.status(200).json({
    success: true,
    message: 'Message created successfully',
    data: result,
  });
});

export const getAllMessageController = catchAsync(async (req, res) => {
  const result = await getAllMessageService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Services get successfully!',
    data: result,
  });
});

export const getSingleMessageController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleMessageService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Message get successfully',
    data: result,
  });
});

export const updateMessageController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateMessageService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Message updated successfully',
    data: result,
  });
});

export const deleteMessageController = catchAsync(async (req, res) => {
  const id = req.params.id;
  await deleteMessageService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Message deleted successfully',
  });
});
