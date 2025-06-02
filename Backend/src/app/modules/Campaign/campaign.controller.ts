import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import Pick from '../../utils/pick';
import { paginationOptionKeys } from '../../utils/constant';
import CampaignServices from './campaign.service';

const createCampaign = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.createCampaignIntoDB(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Campaign created successfully',
    data: result,
  });
});

const createManyCampaign = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.createManyCampaignIntoDB(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Campaigns created successfully',
    data: result,
  });
});

const getCampaigns = catchAsync(async (req: Request, res: Response) => {
  const filter = Pick(req.query, ['searchTerm', 'category']);
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await CampaignServices.getCampaignsFromDB(filter, paginationOptions);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Campaigns retrieved successfully',
    ...result,
  });
});

const getCampaignsForManage = catchAsync(async (req: Request, res: Response) => {
  const filter = Pick(req.query, ['searchTerm', 'category', 'status']);
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await CampaignServices.getCampaignsFromDBForManage(filter, paginationOptions);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Campaigns retrieved successfully',
    ...result,
  });
});

const getCampaignBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.getCampaignBySlugFromDB(req.params.slug);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Campaign retrieved successfully',
    data: result,
  });
});

const getCampaignByIdForManage = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.getCampaignByIdForManage(req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Campaign retrieved successfully',
    data: result,
  });
});

const getRelatedCampaignsFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.getRelatedCampaignsFromDB(req.params.slug);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Related campaigns retrieved successfully',
    data: result,
  });
});

const getRecentCampaigns = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.getRecentCampaignsFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Recent campaigns retrieved successfully',
    data: result,
  });
});


const getRandomCampaign = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.getRandomCampaignFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Recent campaigns retrieved successfully',
    data: result,
  });
});

const getAlmostCompletedCampaigns = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.getAlmostCompletedCampaignsFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Campaigns retrieved successfully',
    data: result,
  });
});

const updateCampaign = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.updateCampaignIntoDB(req.params.id, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Campaign updated successfully',
    data: result,
  });
});

const softDeleteCampaign = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignServices.softDeleteCampaignFromDB(req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Campaign deleted successfully',
    data: result,
  });
});

const CampaignControllers = {
  createCampaign,
  createManyCampaign,
  getCampaigns,
  getRecentCampaigns,
  getRelatedCampaignsFromDB,
  getAlmostCompletedCampaigns,
  getCampaignsForManage,
  getCampaignBySlug,
  getRandomCampaign,
  updateCampaign,
  softDeleteCampaign,
  getCampaignByIdForManage,
};

export default CampaignControllers;
