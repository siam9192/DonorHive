import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import Pick from '../../utils/pick';
import { paginationOptionKeys } from '../../utils/constant';
import UtilsServices from './Utils.service';

const getMyCountsFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UtilsServices.getMyCountsFromDB(req.user);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Retrieved successfully',
    data: result,
  });
});

const UtilsControllers = {
  getMyCountsFromDB,
};

export default UtilsControllers;
