import { ObjectId } from 'mongoose';

export interface INotification {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  message: string;
  isRead: boolean;
  metaData?:Record<string,unknown>
  createdAt: Date;
  updatedAt: Date;
}


export enum ENotificationType {
 Info = 'Info',
 Warning = 'Warning'
}


export enum ENotificationAction {
  Visit = 'visit',
  Download = 'Download'
}

export enum ENotificationCategory {
System  = 'System',
Campaign = 'Campaign',
Donation = 'Donation',
Watchlist = 'Watchlist'
}


