import express from 'express';
const Router = express.Router();
import { auth } from '../../middlewares/auth';
import verifyValidate from '../../middlewares/verifyValidate';
import {
  serviceValidation,
  updateServiceValidation,
} from './serviceValidation';
import {
  addServiceController,
  deleteServiceController,
  getAllServiceController,
  getSingleServiceController,
  updateServiceController,
} from './serviceController';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(serviceValidation),
  addServiceController,
);
Router.get('/all', getAllServiceController);
Router.get('/:id', auth('admin'), getSingleServiceController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateServiceValidation),
  updateServiceController,
);
Router.delete('/delete/:id', auth('admin'), deleteServiceController);

export const serviceRoute = Router;
