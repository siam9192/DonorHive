import AppError from '../../Errors/AppError';
import { calculatePagination } from '../../helpers/paginationHelper';
import httpStatus from '../../shared/http-status';
import { IPaginationOptions } from '../../types';
import { objectId } from '../../utils/function';
import { IAuthUser } from '../Auth/auth.interface';
import { ICreateWatchListItemPayload } from './watch-list-item.interface';
import WatchListItem from './watch-list-item.model';

const createWatchListItem = async (authUser: IAuthUser, payload: ICreateWatchListItemPayload) => {
  const item = await WatchListItem.findOne({
    user: objectId(authUser.id),
    campaign: payload.campaignId,
  });

  if (item) throw new AppError(httpStatus.FORBIDDEN, 'Already exist on your watch list');

  return await WatchListItem.create({
    user: objectId(authUser.id),
    campaign: objectId(payload.campaignId),
  });
};

const deleteWatchListItem = async (authUser: IAuthUser, campaignId: string) => {
  const item = await WatchListItem.findOne({
    campaign: campaignId,
  });

  if (!item) throw new AppError(httpStatus.FORBIDDEN, 'Campaign not found in your watch list');
  await WatchListItem.deleteOne({
    user: objectId(authUser.id),
    campaign: objectId(campaignId),
  });

  return null;
};

const getMyWatchListItemsFromDB = async (
  authUser: IAuthUser,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip } = calculatePagination(paginationOptions);

  const items = await WatchListItem.find({
    user: objectId(authUser.id),
  })
    .skip(skip)
    .limit(limit)
    .populate('campaign');

  const totalResult = await WatchListItem.countDocuments({
    user: objectId(authUser.id),
  });

  return {
    data: items,
    meta: {
      page,
      limit,
      totalResult,
      total: 0,
    },
  };
};

const watchListItemServices = {
  createWatchListItem,
  deleteWatchListItem,
  getMyWatchListItemsFromDB,
};

export default watchListItemServices;
