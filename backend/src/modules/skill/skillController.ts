import httpStatus from 'http-status';
import {
  addSkillService,
  getSkillService,
  updateSkillService,
} from './skillService';
import { catchAsync } from '../../utils/catchAsync';

export const addSkillController = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await addSkillService(data);

  res.status(200).json({
    success: true,
    message: 'Skill created successfully',
    data: result,
  });
});

export const getSkillController = catchAsync(async (req, res) => {
  const result = await getSkillService();

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill retrieved successfully!',
    data: result,
  });
});

export const updateSkillController = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await updateSkillService(id, data);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Skill updated successfully',
    data: result,
  });
});
