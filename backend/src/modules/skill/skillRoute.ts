import express from 'express';
const Router = express.Router();
import { auth } from '../../middlewares/auth';
import verifyValidate from '../../middlewares/verifyValidate';
import {
  addSkillController,
  getSkillController,
  updateSkillController,
} from './skillController';
import { skillValidation, updateSkillValidation } from './skillValidation';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(skillValidation),
  addSkillController,
);
Router.get('/', getSkillController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateSkillValidation),
  updateSkillController,
);

export const skillRoute = Router;
