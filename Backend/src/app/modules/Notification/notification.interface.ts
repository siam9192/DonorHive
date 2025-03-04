import { ObjectId } from 'mongoose';

export interface INotification {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  message: string;
  href?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
