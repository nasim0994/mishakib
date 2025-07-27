import express from 'express';
const Router = express.Router();
import { auth } from '../../middlewares/auth';
import verifyValidate from '../../middlewares/verifyValidate';
import {
  addMessageController,
  deleteMessageController,
  getAllMessageController,
  getSingleMessageController,
  updateMessageController,
} from './messageController';
import {
  messageValidation,
  updateMessageValidation,
} from './messageValidation';

Router.post('/add', verifyValidate(messageValidation), addMessageController);
Router.get('/all', auth('admin'), getAllMessageController);
Router.get('/:id', auth('admin'), getSingleMessageController);
Router.patch(
  '/update/:id',
  auth('admin'),
  verifyValidate(updateMessageValidation),
  updateMessageController,
);
Router.delete('/delete/:id', auth('admin'), deleteMessageController);

export const messageRoute = Router;
