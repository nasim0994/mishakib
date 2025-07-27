import httpStatus from 'http-status';
import {
  addContactService,
  getContactService,
  updateContactService,
} from './contactService';
import { catchAsync } from '../../utils/catchAsync';

export const addContactController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addContactService(data);

  res.status(200).json({
    success: true,
    message: 'Contact created successfully',
    data: result,
  });
});

export const getContactController = catchAsync(async (req, res) => {
  const result = await getContactService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Contact get successfully!',
    data: result,
  });
});

export const updateContactController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateContactService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Contact updated successfully',
    data: result,
  });
});
