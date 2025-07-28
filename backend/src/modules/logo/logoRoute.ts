import express from 'express';
const Router = express.Router();
import { auth } from '../../middlewares/auth';
import {
  addLogoController,
  getLogoController,
  updateLogoController,
} from './logoController';

Router.post('/add', auth('admin'), addLogoController);
Router.get('/', getLogoController);
Router.patch('/update/:id', auth('admin'), updateLogoController);

export const logoRoute = Router;
