import { Types } from 'mongoose';

export interface IWatchListItem {
  campaign: Types.ObjectId;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateWatchListItemPayload {
  campaignId: string;
}
