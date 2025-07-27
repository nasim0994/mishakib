import express from 'express';
const Router = express.Router();
import {
  addCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from './categoryController';
import verifyValidate from '../../../middlewares/verifyValidate';
import {
  categoryValidation,
  updateCategoryValidation,
} from './categoryValidation';
import { auth } from '../../../middlewares/auth';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(categoryValidation),
  addCategoryController,
);
Router.get('/all', getAllCategoryController);
Router.get('/:id', getSingleCategoryController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateCategoryValidation),
  updateCategoryController,
);
Router.delete('/delete/:id', auth('admin'), deleteCategoryController);

export const categoryRoute = Router;
