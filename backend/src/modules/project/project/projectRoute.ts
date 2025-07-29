import express from 'express';
const Router = express.Router();
import {
  addProjectController,
  deleteProjectController,
  getAllProjectController,
  getSingleProjectController,
  updateProjectController,
} from './projectController';
import verifyValidate from '../../../middlewares/verifyValidate';
import {
  projectValidation,
  updateProjectValidation,
} from './projectValidation';
import { auth } from '../../../middlewares/auth';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(projectValidation),
  addProjectController,
);
Router.get('/all', getAllProjectController);
Router.get('/:id', getSingleProjectController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateProjectValidation),
  updateProjectController,
);
Router.delete('/delete/:id', auth('admin'), deleteProjectController);

export const projectRoute = Router;
