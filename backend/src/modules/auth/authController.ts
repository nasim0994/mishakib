import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import {
  createUserService,
  loginUserService,
  refreshTokenService,
} from './authService';
import httpStatus from 'http-status';

export const createUserController = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await createUserService(data);

  res.status(200).json({
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

export const loginUserController = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
    sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      refreshToken,
      user,
    },
  });
});

export const refreshTokenController = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenService(refreshToken);

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Token refreshed successfully',
    data: result,
  });
});
