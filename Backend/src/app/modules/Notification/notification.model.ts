import { model, Schema, Types } from 'mongoose';
import {
  ENotificationAction,
  ENotificationCategory,
  ENotificationType,
  INotification,
} from './notification.interface';

const NotificationModelSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      minlength: 5,
      maxlength: 100,
    },
    message: {
      type: String,
      minlength: 10,
      maxlength: 200,
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    visitId: {
      type: Types.ObjectId,
      default: null,
    },
    visitHref: {
      type: String,
      default: null,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(ENotificationType),
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(ENotificationCategory),
      default: ENotificationCategory.System,
    },
    action: {
      type: String,
      enum: Object.values(ENotificationAction),
      default: ENotificationAction.Default,
    },
    metaData: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model<INotification>('Notification', NotificationModelSchema);

export default Notification;
