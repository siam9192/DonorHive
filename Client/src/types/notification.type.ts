
export interface INotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  visitId?: string;
  visitHref?: string;
  type: ENotificationType;
  category: ENotificationCategory;
  action: ENotificationAction;
  metaData?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
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
