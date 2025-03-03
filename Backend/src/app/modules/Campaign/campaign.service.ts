import { isValidObjectId } from 'mongoose';
import AppError from '../../Errors/AppError';
import { calculatePagination } from '../../helpers/paginationHelper';
import httpStatus from '../../shared/http-status';
import { IPaginationOptions } from '../../types';
import { generateSlug, objectId } from '../../utils/function';
import {
  ECampaignStatus,
  ICreateCampaignPayload,
  IFilterCampaign,
  IUpdateCampaignPayload,
} from './campaign.interface';
import Campaign from './campaign.model';

const createCampaignIntoDB = async (payload: ICreateCampaignPayload) => {
  let slug = generateSlug(payload.title);
  // Generate unique slug
  let counter = 1;
  do {
    const campaign = await Campaign.findOne({
      slug,
    });
    if (!campaign) {
      break;
    }
    counter++;
    slug = generateSlug(payload.title + ' ' + counter);
  } while (true);

  const startAt = new Date(payload.startAt);
  const endAt = new Date(payload.endAt);

  if (startAt.getTime() > endAt.getTime())
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'StartAt can not be getter than endAt');

  (payload.startAt = startAt), (payload.endAt = endAt);

  const data = {
    ...payload,
    slug,
  };
  const result = await Campaign.create(data);
  return result;
};

const createManyCampaignIntoDB = async (payload: ICreateCampaignPayload[]) => {
  const results = [];
  for (const data of payload) {
    const created = await createCampaignIntoDB(data);
    results.push(created);
  }
  return results;
};

const getCampaignsFromDB = async (
  filter: IFilterCampaign,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

  const { searchTerm, ...othersData } = filter;

  const whereConditions: any = {
    status: ECampaignStatus.Active,
    isDeleted: false,
  };

  if (searchTerm) {
    whereConditions.$text = { $search: searchTerm };
  }

  ['category'].forEach((item) => {
    let data = (othersData as any)[item];
    if (data) {
      whereConditions[item] = data;
    }
  });

  const sort = {
    [sortBy]: sortOrder,
  };

  const campaigns = await Campaign.find(whereConditions,{isDeleted:false}).sort(sort).skip(skip).limit(limit);

  const data = campaigns;
  const total = await Campaign.countDocuments();
  const totalResult = await Campaign.countDocuments(whereConditions);
  const meta = {
    page,
    limit,
    total,
    totalResult,
  };
  return {
    data,
    meta,
  };
};

const getCampaignsFromDBForManage = async (
  filter: IFilterCampaign,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

  const { searchTerm, ...othersData } = filter;

  const whereConditions: any = {
    isDeleted: false,
  };

  let filterOthers = true;

  if (searchTerm) {
    if (isValidObjectId(searchTerm)) {
      whereConditions._id = objectId(searchTerm);
      filterOthers = false;
    } else {
      whereConditions.$text = { $search: searchTerm };
    }
  }

  if (filterOthers) {
    ['status', 'category'].forEach((item) => {
      let data = (othersData as any)[item];
      if (data) {
        whereConditions[item] = data;
      }
    });
  }

  const sort = {
    [sortBy]: sortOrder,
  };

  const campaigns = await Campaign.find(whereConditions,{isDeleted:false}).sort(sort).skip(skip).limit(limit);

  const data = campaigns;
  const total = await Campaign.countDocuments();
  const totalResult = await Campaign.countDocuments(whereConditions);
  const meta = {
    page,
    limit,
    total,
    totalResult,
  };
  return {
    data,
    meta,
  };
};

const updateCampaignIntoDB = async (id: string, payload: IUpdateCampaignPayload) => {
  const campaign = await Campaign.findById(id);

  if (!campaign || campaign.isDeleted)
    throw new AppError(httpStatus.NOT_FOUND, 'Campaign not found');
  let status = campaign.status;

  const startAt = new Date(payload.startAt);
  const endAt = new Date(payload.endAt);
  const today = new Date();

  if (startAt.getTime() < today.getTime())
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'invalid startAt');
  if (endAt.getTime() > startAt.getTime()) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'invalid endAt');
  }

  if (payload.targetAmount && payload.targetAmount > campaign.targetAmount) {
    status = ECampaignStatus.Active;
  }

  const data = {
    ...payload,
    status,
  };
  const updateStatus = await Campaign.updateOne(
    {
      _id: objectId(id),
    },

    data
  );

  if (!updateStatus.modifiedCount) {
    throw new AppError(500, 'Campaign could not be update!');
  }
  return null;
};

const softDeleteCampaignFromDB = async (id: string) => {
  const campaign = await Campaign.findOne({
    _id: objectId(id),
    isDeleted: false,
  });
  if (!campaign) throw new AppError(httpStatus.NOT_FOUND, 'Campaign not found');
  const updateStatus = await Campaign.updateOne({
    isDeleted: false,
  });
  if (!updateStatus.modifiedCount) throw new AppError(500, 'Campaign could not be delete!');
};

const getCampaignBySlugFromDB = async (slug: string) => {
  const campaign = await Campaign.findOne(
    {
      slug,
      startAt: {
        $lte: new Date(),
      },
      status: ECampaignStatus.Active,
    },
    { isDeleted: false }
  );
  if (!campaign) throw new AppError(httpStatus.NOT_FOUND, 'Campaign not found');
  return campaign;
};

const CampaignServices = {
  createCampaignIntoDB,
  createManyCampaignIntoDB,
  getCampaignsFromDB,
  getCampaignsFromDBForManage,
  updateCampaignIntoDB,
  softDeleteCampaignFromDB,
  getCampaignBySlugFromDB,
};

export default CampaignServices;
