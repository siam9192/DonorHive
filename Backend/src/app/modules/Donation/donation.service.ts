import { isValidObjectId, ObjectId, startSession } from 'mongoose';
import { IAuthUser } from '../Auth/auth.interface';
import { EDonationStatus, IFilterDonation, IInitDonationPayload } from './donation.interface';
import Donation from './donation.model';
import Campaign from '../Campaign/campaign.model';
import AppError from '../../Errors/AppError';
import httpStatus from '../../shared/http-status';
import PaymentServices from '../Payment/payment.service';
import { objectId } from '../../utils/function';
import { IPaginationOptions } from '../../types';
import { calculatePagination } from '../../helpers/paginationHelper';
import path from 'path';
import ejs from 'ejs';
import NodeMailerServices from '../NodeMailer/node-mailer.service';
import Notification from '../Notification/notification.model';
import { IPayment } from '../Payment/payment.interface';

const initDonationIntoDB = async (
  authUser: IAuthUser | undefined,
  payload: IInitDonationPayload
) => {
  const campaign = await Campaign.findById(payload.campaignId);
  if (!campaign) throw new AppError(httpStatus.NOT_FOUND, 'Campaign not found');

  const data: any = {
    campaign: {
      id: campaign._id,
      title: campaign.title,
      coverImageUrl: campaign.coverImageUrl,
      category: campaign.category,
    },
    amount: payload.amount,
    isAnonymously: payload.isAnonymously,
    comment: payload.comment
  };

  if (authUser) {
    data.userId = authUser.id;
 } 

  
    if (!payload.isAnonymously) {
      data.donorPersonalInfo = payload.donorPersonalInfo
    }
  

  const session = await startSession();
  session.startTransaction();

  
  try {
    const createdDonation = await Donation.create([data], { session });

    const { paymentId, paymentUrl } = await PaymentServices.InitPaymentIntoDB({
      title: campaign.title,
      amount: payload.amount,
      method: payload.paymentMethod,
      userId: authUser?.id,
      donationId: createdDonation[0]._id,
    });

    const updateStatus = await Donation.updateOne(
      {
        _id: createdDonation[0]._id,
      },
      {
        paymentId,
      },
      {
        session,
      }
    );
    if (!updateStatus.modifiedCount) throw new Error();

    await session.commitTransaction();
    await session.endSession();
    return {
      paymentUrl,
    };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error();
  }
};

const manageDonationAfterSuccessfulPayment = async (id: string | ObjectId) => {
  try {
    const donation = await Donation.findById(id)
      .populate('userId', {
        _id: true,
        email: true,
        fullName: true,
      })
      .populate('paymentId', 'transactionId');

    if (!donation) throw new Error();

    let email;
    let name;
    let transactionId = (donation.paymentId as any as IPayment).transactionId;
    if (donation.userId) {
      const { _doc: user } = { ...donation.userId } as any;

      name = user.fullName;
      if (user.email) {
        email = user.email;
      }

      const notificationData = {
        userId: user._id,
        title: 'Donation Successful',
        message: `Thank you for your generous donation of $${donation.amount}. Your support helps us continue our mission.`,
        href: '/profile/my-donations',
      };

      // Create notification of successful donation
      await Notification.create(notificationData);
    } else {
      const guestDonorInfo = donation.guestDonorInfo;

      if (guestDonorInfo?.email) {
        email = guestDonorInfo.email;
      }
      if (guestDonorInfo?.fullName) {
        name = guestDonorInfo.fullName;
      }
    }

    // Send email if email exist
    if (email) {
      await ejs.renderFile(
        path.join(process.cwd(), '/src/app/email-templates/donation-success.html'),
        {
          name,
          transactionId,
          amount: donation.amount,
          date: `${new Date(donation.updatedAt).toDateString()} ${new Date(donation.updatedAt).toLocaleTimeString()}`,
        },
        async function (err, template) {
          if (err) {
            throw new AppError(400, 'Something went wrong');
          } else {
            await NodeMailerServices.sendEmail({
              emailAddress: email,
              subject: 'Donation successful',
              template,
            });
          }
        }
      );
    }
  } catch (error) {}
};

const getDonationsForManageFromDB = async (
  filter: IFilterDonation,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

  const { searchTerm, status, donorType } = filter;

  const whereConditions: any = {};

  let filterOthers = true;

  if (searchTerm) {
    if (isValidObjectId(searchTerm)) {
      whereConditions.$or = [
        {
          _id: objectId(searchTerm),
        },
        {
          userId: objectId(searchTerm),
        },
        {
          campaignId: objectId(searchTerm),
        },
      ];
      filterOthers = false;
    } else {
      whereConditions.$or = [
        { 'campaign.title': { $regex: searchTerm, $options: 'i' } },
        { 'guestDonorInfo.fullName': { $regex: searchTerm, $options: 'i' } },
      ];
    }
  }
  if (filterOthers) {
    if (status) {
      whereConditions.status = status;
    }
    //  else {
    //   whereConditions.status = {
    //     $not: {
    //       $in: ['Pending', 'Unpaid'],
    //     },
    //   };
    // }

    if (donorType) {
      switch (donorType) {
        case 'anonymous':
          whereConditions.isAnonymously = true;
          break;
        case 'guest':
          whereConditions.isAnonymously = false;
          whereConditions.userId = {
            $eq: null,
          };
          break;

        case 'registered':
          whereConditions.isAnonymously = false;
          whereConditions.userId = {
            $ne: null,
          };
          break;

        default:
          break;
      }
    }
  }
  const sort = {
    [sortBy]: sortOrder,
  };

  const selectStr =
    '_id amount isAnonymously campaign  userId guestDonorInfo status createdAt updatedAt';

  const donations = await Donation.find(whereConditions)
    .sort(sort)
    .select(selectStr)
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'userId',
      select: '_id  fullName profilePhotoUrl email phoneNumber address',
    });

  const data = donations.map((donation) => {
    const {
      _doc: { paymentId, userId, ...othersData },
    }: any = { ...donation };

    const result = {
      ...othersData,
      user: userId,
    };
    return result;
  });

  const totalResult = await Donation.countDocuments(whereConditions);
  const total = await Donation.countDocuments({
    status: {
      $not: {
        $in: ['Pending', 'Unpaid'],
      },
    },
  });
  const meta = {
    page,
    limit,
    totalResult,
    total,
  };

  return {
    data,
    meta,
  };
};

const getMyDonationsFromDB = async (
  authUser: IAuthUser,
  filter: IFilterDonation,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

  const whereConditions: any = {
    userId: objectId(authUser.id),
  };

  const sort = {
    [sortBy]: sortOrder,
  };

  const selectStr =
    '_id amount comment userId paymentId isAnonymously campaign status createdAt updatedAt';

  const donations = await Donation.find(whereConditions)
    .sort(sort)
    .select(selectStr)
    .skip(skip)
    .limit(limit)
    .select(selectStr)
    .populate([
      {
        path: 'userId',
        select: '_id  fullName profilePhotoUrl email phoneNumber address',
      },
    ])
    .select({
      __v: false,
    });

  const data = donations.map((donation) => {
    const {
      _doc: { paymentId, userId, ...othersData },
    }: any = { ...donation };

    const result = {
      ...othersData,
      user: userId,
      payment: paymentId,
    };
    return result;
  });

  const totalResult = await Donation.countDocuments(whereConditions);
  const total = await Donation.countDocuments({
    status: {
      $in: [EDonationStatus.Paid, EDonationStatus.Refunded],
    },
  });
  const meta = {
    page,
    limit,
    totalResult,
    total,
  };

  return {
    data,
    meta,
  };
};

const getMyRecentDonationsFromDB = async (authUser: IAuthUser) => {
  const selectStr = '_id amount comment isAnonymously campaign status createdAt updatedAt';

  const recentDate = new Date(new Date().toDateString());
  recentDate.setDate(new Date().getDate() - 15);
  const donations = await Donation.find({
    userId: authUser.id,
    status: {
      $in: [EDonationStatus.Paid, EDonationStatus.Refunded],
    },
    createdAt: {
      $gte: recentDate,
    },
  })
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .select(selectStr)
    .populate([
      {
        path: 'paymentId',
        select: {
          __v: false,
        },
      },
    ])
    .select({
      __v: false,
    });

  const data = donations.map((donation) => {
    const {
      _doc: { paymentId, userId, ...othersData },
    }: any = { ...donation };

    const result = {
      ...othersData,
      payment: paymentId,
    };
    return result;
  });
  return data;
};

const getRecentDonationsFromDB = async () => {
  const selectStr = '_id amount comment isAnonymously campaign status createdAt updatedAt';
  const recentDate = new Date(new Date().toDateString());
  recentDate.setDate(new Date().getDate() - 15);
  const donations = await Donation.find({
    status: {
      $in: [EDonationStatus.Paid, EDonationStatus.Refunded],
    },
    createdAt: {
      $gte: recentDate,
    },
  })
    .sort({
      createdAt: -1,
    })
    .limit(10)
    .select(selectStr)
    .populate([
      {
        path: 'userId',
        select: '_id  fullName profilePhotoUrl email phoneNumber address',
      },
      {
        path: 'paymentId',
        select: {
          __v: false,
        },
      },
    ])
    .select({
      __v: false,
    });

  const data = donations.map((donation) => {
    const {
      _doc: { paymentId, userId, ...othersData },
    }: any = { ...donation };

    const result = {
      ...othersData,
      user: userId || null,
      payment: paymentId,
    };
    return result;
  });
  return data;
};

const getDonationDetailsForManageFromDB = async (id: string) => {
  const donation = await Donation.findById(id)
    .populate([
      {
        path: 'userId',
        select: '_id  fullName profilePhotoUrl email phoneNumber address',
      },
      {
        path: 'paymentId',
        select: {
          __v: false,
        },
      },
    ])
    .select({
      __v: false,
    });

  if (!donation) throw new AppError(httpStatus.NOT_FOUND, 'Donation not found');

  const {
    _doc: { paymentId, userId, ...othersData },
  }: any = { ...donation };

  const result = {
    ...othersData,
    user: userId,
    payment: paymentId,
  };

  return result;
};

const getMyDonationDetailsFromDB = async (authUser: IAuthUser, id: string) => {
  const donation = await Donation.findOne({
    _id: objectId(id),
    userId: objectId(authUser.id),
  })
    .populate([
      {
        path: 'userId',
        select: '_id  fullName profilePhotoUrl email phoneNumber address',
      },
      {
        path: 'paymentId',
        select: {
          __v: false,
        },
      },
    ])
    .select({
      __v: false,
    });

  if (!donation) throw new AppError(httpStatus.NOT_FOUND, 'Donation not found');
  const {
    _doc: { paymentId, userId, ...othersData },
  }: any = { ...donation };

  const result = {
    ...othersData,
    user: userId,
    payment: paymentId,
  };
  return result;
};

const getCampaignLatestDonationsFromDB = async (id: string) => {
  const donations = await Donation.find(
    {
      'campaign.id': objectId(id),
      status: EDonationStatus.Paid,
    },
    {
      paymentId: false,
    }
  )
    .sort({ createdAt: -1 })
    .populate('userId', '_id fullName profilePhotoUrl address')
    .limit(5);

  const data = donations.map((donation) => {
    const {
      _doc: { paymentId, userId, ...othersData },
    }: any = { ...donation };

    const result = {
      ...othersData,
      user: userId,
    };
    return result;
  });
  return data;
};

const getCampaignDonationsFromDB = async (id: string, paginationOptions: IPaginationOptions) => {
  const { page, skip, limit } = calculatePagination(paginationOptions, 6);

  const whereConditions = {
    'campaign.id': objectId(id),
    status: EDonationStatus.Paid,
  };
  const donations = await Donation.find(whereConditions, {
    paymentId: false,
  })
    .sort({ createdAt: -1 })
    .populate('userId', '_id fullName profilePhotoUrl address')
    .skip(skip)
    .limit(limit);

  const data = donations.map((donation) => {
    const {
      _doc: { paymentId, userId, ...othersData },
    }: any = { ...donation };

    const result = {
      ...othersData,
      user: userId,
    };
    return result;
  });

  const totalResult = await Donation.countDocuments(whereConditions);
  const total = totalResult;

  const meta = {
    page,
    limit,
    totalResult,
    total,
  };
  return {
    data,
    meta,
  };
};

const getDonationsSummaryFromDB = async () => {
  const totalDonationsCount = await Donation.countDocuments({
    status: EDonationStatus.Paid,
  });

  const totalDonationAmount =
    (
      await Donation.aggregate([
        {
          $match: { status: EDonationStatus.Paid },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
          },
        },
      ])
    )[0]?.totalAmount || 0;

  const today = new Date(new Date().toDateString());

  const todayDonations = await Donation.find({
    status: EDonationStatus.Paid,
    createdAt: { $gte: today },
  }).select('amount');

  const todayDonationsCount = todayDonations.length;
  const todayTotalDonationAmount = todayDonations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  // Last 30 days
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const last30DaysDonations = await Donation.find({
    status: EDonationStatus.Paid,
    createdAt: { $gte: last30Days },
  }).select('amount');

  const last30DaysDonationsCount = last30DaysDonations.length;
  const last30DaysTotalDonationAmount = last30DaysDonations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  return {
    totalDonationsCount,
    totalDonationAmount,
    todayDonationsCount,
    todayTotalDonationAmount,
    last30DaysDonationsCount,
    last30DaysTotalDonationAmount,
  };
};

const DonationServices = {
  initDonationIntoDB,
  manageDonationAfterSuccessfulPayment,
  getDonationsForManageFromDB,
  getMyDonationsFromDB,
  getMyRecentDonationsFromDB,
  getRecentDonationsFromDB,
  getDonationDetailsForManageFromDB,
  getMyDonationDetailsFromDB,
  getCampaignLatestDonationsFromDB,
  getCampaignDonationsFromDB,
  getDonationsSummaryFromDB,
};

export default DonationServices;
