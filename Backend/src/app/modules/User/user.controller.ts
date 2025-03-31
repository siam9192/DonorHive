import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import UserServices from './user.service';
import Pick from '../../utils/pick';
import { paginationOptionKeys } from '../../utils/constant';

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filter = Pick(req.query, ['searchTerm', 'status', 'id']);
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await UserServices.getUsersFromDB(filter, paginationOptions);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    ...result,
  });
});

const createMany = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createManyUsers(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Please check your email',
    data: result,
  });
});

const getUserDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserDetailsFromDB(req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User details retrieved successfully',
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.changeUserStatusIntoDB(req.params.id, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User status changed successfully',
    data: result,
  });
});

const userSoftDelete = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.softDeleteUserFromDB(req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

const getRecentUsersFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getRecentUsersFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Recent users retrieved successfully',
    data: result,
  });
});

const getUserSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUsersSummaryFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Users summary retrieved successfully',
    data: result,
  });
});

const UserControllers = {
  getUsers,
  createMany,
  getUserDetails,
  changeUserStatus,
  getRecentUsersFromDB,
  getUserSummary,
  userSoftDelete,
};

export default UserControllers;
