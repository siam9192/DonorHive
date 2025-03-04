import { calculatePagination } from '../../helpers/paginationHelper';
import { IPaginationOptions } from '../../types';
import { objectId } from '../../utils/function';
import { IAuthUser } from '../Auth/auth.interface';
import Notification from './notification.model';

const getMyNotificationsFromDB = async (
  authUser: IAuthUser,
  paginationOptions: IPaginationOptions
) => {
  const { page, skip, limit } = calculatePagination(paginationOptions, 4);

  const whereConditions = {
    userId: objectId(authUser.id),
  };
  const notifications = await Notification.find(whereConditions).skip(skip).limit(limit).sort({
    isRead: -1,
  });

  const data = notifications;

  const total = await Notification.countDocuments(whereConditions);
  const totalResult = total;
  const meta = {
    page,
    limit,
    totalResult,
    total,
  };
  return {
    data,
    meta,
  };
};

const setAsReadMyAllNotificationsIntoDB = async (authUser: IAuthUser) => {
  await Notification.updateMany(
    {
      userId: objectId(authUser.id),
      isRead: false,
    },
    {
      isRead: true,
    }
  );
};

const NotificationServices = {
  getMyNotificationsFromDB,
  setAsReadMyAllNotificationsIntoDB,
};

export default NotificationServices;
