export interface IMySummary {
  donationsCount: number;
  totalDonatedAmount: number;
  unReadNotificationsCount: number;
  watchListedCount: number;
}

export interface IAdminOverviewSummary {
  donationsCount: number;
  totalDonationAmount: number;
  usersCount: number;
  campaignsCount: number;
}

export interface ITopDonor {
  _id: string;
  fullName: string;
  profilePhotoUrl: string;
  donatedAmount: number;
}
