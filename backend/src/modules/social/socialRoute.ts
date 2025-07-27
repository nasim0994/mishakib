import express from 'express';
const Router = express.Router();
import { auth } from '../../middlewares/auth';
import verifyValidate from '../../middlewares/verifyValidate';
import {
  addSocialController,
  deleteSocialController,
  getAllSocialController,
  getSingleSocialController,
  updateSocialController,
} from './socialController';
import { socialValidation, updateSocialValidation } from './socialValidation';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(socialValidation),
  addSocialController,
);
Router.get('/all', getAllSocialController);
Router.get('/:id', auth('admin'), getSingleSocialController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateSocialValidation),
  updateSocialController,
);
Router.delete('/delete/:id', auth('admin'), deleteSocialController);

export const socialRoute = Router;
