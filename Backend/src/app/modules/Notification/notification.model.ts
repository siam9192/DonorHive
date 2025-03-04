import { model, Schema } from 'mongoose';
import { INotification } from './notification.interface';

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
    href: {
      type: String,
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model<INotification>('Notification', NotificationModelSchema);

export default Notification;
