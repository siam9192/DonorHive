import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import NotificationServices from './notification.service';
import Pick from '../../utils/pick';
import { paginationOptionKeys } from '../../utils/constant';

const getMyNotifications = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await NotificationServices.getMyNotificationsFromDB(req.user, paginationOptions);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Notification retrieved successfully',
   ...result
  });
});

const setAsReadMyAllNotificationsIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await NotificationServices.setAsReadMyAllNotificationsIntoDB(req.user);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Notification updated successfully',
      data: result,
    });
  });

const NotificationControllers = {
    getMyNotifications,
    setAsReadMyAllNotificationsIntoDB
}

export default NotificationControllers