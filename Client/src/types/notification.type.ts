export interface INotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  href?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
