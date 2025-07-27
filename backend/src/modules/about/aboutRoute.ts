import express from 'express';
const Router = express.Router();
import { auth } from '../../middlewares/auth';
import verifyValidate from '../../middlewares/verifyValidate';
import { aboutValidation, updateAboutValidation } from './aboutValidation';
import {
  addAboutController,
  getAboutController,
  updateAboutController,
} from './aboutController';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(aboutValidation),
  addAboutController,
);
Router.get('/', getAboutController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateAboutValidation),
  updateAboutController,
);

export const aboutRoute = Router;
