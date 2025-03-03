import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import ProfileServices from './profile.service';

const getMyProfileFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileServices.getMyProfileFromDB(req.user);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'My Profile retrieved successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileServices.updateMyProfileIntoDB(req.user, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'My Profile updated successfully',
    data: result,
  });
});

const ProfileControllers = {
  getMyProfileFromDB,
  updateMyProfile,
};

export default ProfileControllers;
