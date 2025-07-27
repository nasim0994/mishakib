import express from 'express';
const Router = express.Router();
import { auth } from '../../middlewares/auth';
import verifyValidate from '../../middlewares/verifyValidate';
import {
  addCounterController,
  deleteCounterController,
  getAllCounterController,
  getSingleCounterController,
  updateCounterController,
} from './counterController';
import {
  counterValidation,
  updateCounterValidation,
} from './counterValidation';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(counterValidation),
  addCounterController,
);
Router.get('/all', getAllCounterController);
Router.get('/:id', auth('admin'), getSingleCounterController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateCounterValidation),
  updateCounterController,
);
Router.delete('/delete/:id', auth('admin'), deleteCounterController);

export const counterRoute = Router;
