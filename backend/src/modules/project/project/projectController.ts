import httpStatus from 'http-status';
import {
  addProjectService,
  deleteProjectService,
  getAllGalleryImageService,
  getAllProjectService,
  getSingleProjectService,
  updateProjectService,
} from './projectService';
import { catchAsync } from '../../../utils/catchAsync';

export const addProjectController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addProjectService(data);

  res.status(200).json({
    success: true,
    message: 'Project created successfully',
    data: result,
  });
});

export const getAllProjectController = catchAsync(async (req, res) => {
  const { meta, data } = await getAllProjectService(req.query);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project get successfully!',
    meta,
    data,
  });
});

export const getAllGalleryImageController = catchAsync(async (req, res) => {
  const result = await getAllGalleryImageService(req.query);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Galleries get successfully!',
    data: result,
  });
});

export const getSingleProjectController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await getSingleProjectService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project get successfully',
    data: result,
  });
});

export const updateProjectController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateProjectService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project updated successfully',
    data: result,
  });
});

export const deleteProjectController = catchAsync(async (req, res) => {
  const id = req.params.id;
  await deleteProjectService(id);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Project deleted successfully',
  });
});
