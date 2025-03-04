import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import Pick from '../../utils/pick';
import { paginationOptionKeys } from '../../utils/constant';
import DonationServices from './donation.service';

const initDonation = catchAsync(async (req: Request, res: Response) => {
  const result = await DonationServices.initDonationIntoDB(req.user, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Payment url retrieved successfully',
    data: result,
  });
});

const getDonationsForManage = catchAsync(async (req: Request, res: Response) => {
  const filter = Pick(req.query, ['searchTerm', 'status', 'donorType']);
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await DonationServices.getDonationsForManageFromDB(filter, paginationOptions);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Donations retrieved successfully',
    ...result,
  });
});

const getMyDonations = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await DonationServices.getMyDonationsFromDB(req.user, {}, paginationOptions);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Donations retrieved successfully',
    ...result,
  });
});

const getMyRecentDonations = catchAsync(async (req: Request, res: Response) => {
  const result = await DonationServices.getMyRecentDonationsFromDB(req.user);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Recent Donations retrieved successfully',
    data: result,
  });
});

const getDonationDetailsForManage = catchAsync(async (req: Request, res: Response) => {
  const result = await DonationServices.getDonationDetailsForManageFromDB(req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Donation retrieved successfully',
    data: result,
  });
});

const getMyDonationDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await DonationServices.getMyDonationDetailsFromDB(req.user, req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Donation retrieved successfully',
    data: result,
  });
});

const getDonationsSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await DonationServices.getDonationsSummaryFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Donations summary retrieved successfully',
    data: result,
  });
});

const DonationControllers = {
  initDonation,
  getDonationsForManage,
  getMyDonations,
  getMyRecentDonations,
  getDonationDetailsForManage,
  getMyDonationDetails,
  getDonationsSummary,
};

export default DonationControllers;
