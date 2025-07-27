import express from 'express';
const Router = express.Router();
import { auth } from '../../middlewares/auth';
import verifyValidate from '../../middlewares/verifyValidate';
import {
  addContactController,
  getContactController,
  updateContactController,
} from './contactController';
import {
  contactValidation,
  updateContactValidation,
} from './contactValidation';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(contactValidation),
  addContactController,
);
Router.get('/', getContactController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateContactValidation),
  updateContactController,
);

export const contactRoute = Router;
