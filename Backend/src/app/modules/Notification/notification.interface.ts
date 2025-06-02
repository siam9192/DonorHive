import { ObjectId } from 'mongoose';

export interface INotification {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  message: string;
  visitId?: ObjectId;
  visitHref?: string;
  type: ENotificationType;
  category: ENotificationCategory;
  action: ENotificationAction;
  metaData?: Record<string, unknown>;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum ENotificationType {
  Info = 'Info',
  Warning = 'Warning',
}

export enum ENotificationAction {
  Visit = 'visit',
  Download = 'Download',
  Default = 'Default',
}

export enum ENotificationCategory {
  System = 'System',
  Campaign = 'Campaign',
  Donation = 'Donation',
  Watchlist = 'Watchlist',
}
