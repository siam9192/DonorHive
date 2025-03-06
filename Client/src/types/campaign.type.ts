export interface ICampaign {
  _id: string;
  title: string;
  coverImageUrl: string;
  description: string;
  category: string;
  slug: string;
  startAt: Date;
  endAt: Date;
  targetAmount: number;
  raisedAmount: number;
  status: TCampaignStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCampaignPayload {
  readonly title: string;
  readonly coverImageUrl: string;
  readonly description: string;
  readonly category: string;
  startAt: string | Date;
  endAt: string | Date;
  readonly targetAmount: number;
}

export interface IUpdateCampaignPayload {
  title: string;
  coverImageUrl: string;
  description: string;
  category: string;
  startAt: Date;
  endAt: Date;
  targetAmount: number;
}

export interface IFilterCampaign {
  category?: string;
  searchTerm?: string;
  status?: TCampaignStatus;
}

export type TCampaignStatus = `${ECampaignStatus}`;

export enum ECampaignStatus {
  NotStarted = "Not_Started",
  Active = "Active",
  Paused = "Paused",
  Completed = "Completed",
  Expired = "Expired",
}
