import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import OverviewServices from './overview.service';

const getDonorOverviewSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await OverviewServices.getDonorOverviewSummaryFromDB(req.user);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Retrieved successfully',
    data: result,
  });
});

const getAdminOverviewSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await OverviewServices.getAdminOverviewSummary();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Retrieved successfully',
    data: result,
  });
});

const getTopDonors = catchAsync(async (req: Request, res: Response) => {
  const result = await OverviewServices.getTopDonorsFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Retrieved successfully',
    data: result,
  });
});

const OverviewControllers = {
  getDonorOverviewSummary,
  getAdminOverviewSummary,
  getTopDonors,
};

export default OverviewControllers;
