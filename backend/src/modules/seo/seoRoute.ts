import express from 'express';
const Router = express.Router();
import { createSeo, getSeo, updateSeo } from './seoController';
import verifyValidate from '../../middlewares/verifyValidate';
import { seoValidation } from './seoValidation';
import { auth } from '../../middlewares/auth';

Router.post('/add', auth('admin'), verifyValidate(seoValidation), createSeo);
Router.get('/', getSeo);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(seoValidation),
  updateSeo,
);

export const seoRoute = Router;
