import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import { sendSuccessResponse } from '../../utils/response';
import watchListItemServices from './watch-list-items.service';
import catchAsync from '../../utils/catchAsync';
import Pick from '../../utils/pick';
import { paginationOptionKeys } from '../../utils/constant';

const createWatchListItem = catchAsync(async (req: Request, res: Response) => {
  const result = await watchListItemServices.createWatchListItem(req.user, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully added to your watch list',
    data: result,
  });
});

const deleteWatchListItem = catchAsync(async (req: Request, res: Response) => {
  const result = await watchListItemServices.deleteWatchListItem(req.user, req.params.campaignId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Campaign removed from your watch list ',
    data: result,
  });
});

const getMyWatchListItems = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = Pick(req.body, paginationOptionKeys);
  const result = await watchListItemServices.getMyWatchListItemsFromDB(req.user, paginationOptions);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Retrieved successfully',
    data: result,
  });
});

const watchListItemControllers = {
  createWatchListItem,
  deleteWatchListItem,
  getMyWatchListItems,
};

export default watchListItemControllers;
