import { ObjectId } from 'mongoose';
import { objectId } from '../../utils/function';
import { IAuthUser } from '../Auth/auth.interface';
import { ECampaignStatus } from '../Campaign/campaign.interface';
import Campaign from '../Campaign/campaign.model';
import { EDonationStatus } from '../Donation/donation.interface';
import Donation from '../Donation/donation.model';
import Notification from '../Notification/notification.model';
import { EUserStatus } from '../User/user.interface';
import User from '../User/user.model';

const getDonorOverviewSummaryFromDB = async (authUser: IAuthUser) => {
  const donationsCount = await Donation.countDocuments({
    userId: objectId(authUser.id),
    status: EDonationStatus.Success,
  });

  const totalDonatedAmount = await Donation.aggregate([
    {
      $match: {
        userId: objectId(authUser.id),
        status: EDonationStatus.Success,
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: {
          $sum: '$amount',
        },
      },
    },
  ]);
  const unReadNotificationsCount = await Notification.countDocuments({
    _id: objectId(authUser.id),
    isRead: false,
  });
  const watchListedCount = 0;

  return {
    donationsCount,
    totalDonatedAmount: totalDonatedAmount[0].totalAmount,
    unReadNotificationsCount,
    watchListedCount,
  };
};

const getAdminOverviewSummary = async () => {
  const donationsCount = await Donation.countDocuments({
    status: EDonationStatus.Success,
  });
  const totalDonationAmount = await Donation.aggregate([
    {
      $match: {
        status: EDonationStatus.Success,
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: {
          $sum: '$amount',
        },
      },
    },
  ]);

  const usersCount = await User.countDocuments({
    status: {
      $not: {
        $eq: EUserStatus.Deleted,
      },
    },
  });

  const campaignsCount = await Campaign.countDocuments();
  return {
    donationsCount,
    totalDonationAmount: totalDonationAmount[0].totalAmount,
    usersCount,
    campaignsCount,
  };
};

const getTopDonorsFromDB = async () => {
  const data = await Donation.aggregate([
    {
      $match: {
        status: EDonationStatus.Success,
        userId: {
          $not: {
            $eq: null,
          },
        },
      },
    },
    {
      $group: {
        _id: '$userId',
        totalAmount: {
          $sum: '$amount',
        },
      },
    },
    {
      $sort: {
        totalAmount: -1,
      },
    },
  ]);

  const users = await User.find(
    {
      _id: {
        $in: data.map((item) => objectId(item._id)),
      },
    },
    {
      _id: true,
      fullName: true,
      profilePhotoUrl: true,
    }
  );

  const result = users
    .map((user) => {
      const { _doc } = { ...user } as any;
      return {
        ..._doc,
        donatedAmount: data.find((item) => item._id == user._id.toString()),
      };
    })
    .sort((a, b) => b.totalAmount - a.totalAmount);

  return result;
};

const OverviewServices = {
  getDonorOverviewSummaryFromDB,
  getAdminOverviewSummary,
  getTopDonorsFromDB,
};

export default OverviewServices;
