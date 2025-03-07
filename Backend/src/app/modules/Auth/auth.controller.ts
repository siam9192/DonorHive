import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import AuthServices from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Please check your email',
    data: result,
  });
});
const verifyRegistration = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.verifyRegistration(req.params.token);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Account registration successful',
    data: result,
  });
});
const googleCallback = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.googleCallback(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Login successful',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Login successful',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.changePassword(req.user, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Password Changed Successfully',
    data: result,
  });
});

const getAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await AuthServices.getAccessToken(refreshToken);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Access token retrieved successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.getMeFromDB(req.user);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Retrieved successfully',
    data: result,
  });
});

const AuthControllers = {
  register,
  verifyRegistration,
  googleCallback,
  login,
  changePassword,
  getAccessToken,
  getMe,
};

export default AuthControllers;
