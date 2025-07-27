import express from 'express';
const Router = express.Router();
import {
  addGalleryController,
  deleteGalleryController,
  getAllGalleryController,
  getSingleGalleryController,
  updateGalleryController,
} from './galleryController';
import verifyValidate from '../../../middlewares/verifyValidate';
import {
  galleryValidation,
  updateGalleryValidation,
} from './galleryValidation';
import { auth } from '../../../middlewares/auth';

Router.post(
  '/add',
  auth('admin'),
  verifyValidate(galleryValidation),
  addGalleryController,
);
Router.get('/all', getAllGalleryController);
Router.get('/:id', getSingleGalleryController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateGalleryValidation),
  updateGalleryController,
);
Router.delete('/delete/:id', auth('admin'), deleteGalleryController);

export const galleryRoute = Router;
