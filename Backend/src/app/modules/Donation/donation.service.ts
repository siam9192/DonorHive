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
import path, { join } from 'path';
import ejs from 'ejs';
import NodeMailerServices from '../NodeMailer/node-mailer.service';
import Notification from '../Notification/notification.model';
import { IPayment } from '../Payment/payment.interface';
import { IUser } from '../User/user.interface';
import {
  ENotificationAction,
  ENotificationCategory,
  ENotificationType,
} from '../Notification/notification.interface';
import { Response } from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs';
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
    comment: payload.comment,
  };

  if (authUser) {
    data.userId = authUser.id;
  }

  if (!payload.isAnonymously) {
    data.donorPersonalInfo = payload.donorPersonalInfo;
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
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
    throw new Error();
  }
};

const manageDonationAfterSuccessfulPayment = async (id: string | ObjectId) => {
  try {
    const donation = await Donation.findById(id)
      .populate([
        'paymentId',
        {
          path: 'userId',
          select: {
            _id: true,
            email: true,
            fullName: true,
          },
        },
      ])
      .lean();

    if (!donation) throw new Error();

    const user = donation.userId as any as IUser;
    const payment = donation.paymentId as any as IPayment;

    if (!donation.isAnonymously) {
      Notification.create({
        userId: user._id,
        title: 'Donation Successful',
        message: `Thank you for your generous donation of "$${donation.amount}" to our "${donation.campaign.title}" campaign. Your support helps us continue our mission.`,
        type: ENotificationType.Info,
        category: ENotificationCategory.Donation,
        action: ENotificationAction.Visit,
        visitId: donation._id,
      });
    }

    const donorInfo = donation.donorPersonalInfo!;
    await ejs.renderFile(
      path.join(process.cwd(), '/src/app/email-templates/donation-success.html'),
      {
        name,
        transactionId: payment.transactionId,
        amount: donation.amount,
        date: `${new Date(donation.updatedAt).toDateString()} ${new Date(donation.updatedAt).toLocaleTimeString()}`,
      },
      async function (err, template) {
        if (err) {
          throw new AppError(400, 'Something went wrong');
        } else {
          await NodeMailerServices.sendEmail({
            emailAddress: donorInfo.email,
            subject: 'Donation successful',
            template,
          });
        }
      }
    );
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
        { 'donorPersonalInfo.fullName': { $regex: searchTerm, $options: 'i' } },
      ];
    }
  }
  if (filterOthers) {
    if (status) {
      whereConditions.status = status;
    }

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
    '_id amount isAnonymously campaign  userId donorPersonalInfo status createdAt updatedAt';

  const donations = await Donation.find(whereConditions)
    .sort(sort)
    .select(selectStr)
    .skip(skip)
    .limit(limit)
    .populate({
      path: 'userId',
      select: '_id  fullName profilePhotoUrl email phoneNumber address',
    })
    .lean();

  const data = donations.map((donation) => {
    const { paymentId, userId, ...othersData } = donation;

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
    '_id amount comment userId paymentId isAnonymously donorPersonalInfo campaign status createdAt updatedAt';

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
    })
    .lean();

  const data = donations.map((donation) => {
    const { paymentId, userId, ...othersData } = donation;

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
      $in: [EDonationStatus.Success, EDonationStatus.Refunded],
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
  const selectStr =
    '_id amount comment isAnonymously donorPersonalInfo campaign status createdAt updatedAt';

  const recentDate = new Date(new Date().toDateString());
  recentDate.setDate(new Date().getDate() - 15);
  const donations = await Donation.find({
    userId: authUser.id,
    status: {
      $in: [EDonationStatus.Success, EDonationStatus.Refunded],
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
    })
    .lean();

  const data = donations.map((donation) => {
    const { paymentId, userId, ...othersData } = donation;

    const result = {
      ...othersData,
      payment: paymentId,
    };
    return result;
  });
  return data;
};

const getRecentDonationsFromDB = async () => {
  const selectStr =
    '_id amount comment isAnonymously donorPersonalInfo  campaign status createdAt updatedAt';
  const recentDate = new Date(new Date().toDateString());
  recentDate.setDate(new Date().getDate() - 15);
  const donations = await Donation.find({
    status: {
      $in: [EDonationStatus.Success, EDonationStatus.Refunded],
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
        select: '_id  fullName profilePhotoUrl email  phoneNumber address',
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
    })
    .lean();

  const data = donations.map((donation) => {
    const { paymentId, userId, ...othersData } = donation;

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
    })
    .lean();

  if (!donation) throw new AppError(httpStatus.NOT_FOUND, 'Donation not found');

  const { paymentId, userId, ...othersData } = donation;

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
    })
    .lean();

  if (!donation) throw new AppError(httpStatus.NOT_FOUND, 'Donation not found');
  const { paymentId, userId, ...othersData } = donation;
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
      status: EDonationStatus.Success,
    },
    {
      paymentId: false,
    }
  )
    .sort({ createdAt: -1 })
    .populate('userId', '_id fullName profilePhotoUrl address')
    .limit(5)
    .lean();

  const data = donations.map((donation) => {
    const { paymentId, userId, ...othersData } = donation;

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
    status: EDonationStatus.Success,
  };
  const donations = await Donation.find(whereConditions, {
    paymentId: false,
  })
    .sort({ createdAt: -1 })
    .populate('userId', '_id fullName profilePhotoUrl address')
    .skip(skip)
    .limit(limit)
    .lean();

  const data = donations.map((donation) => {
    const { paymentId, userId, ...othersData } = donation;

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
    status: EDonationStatus.Success,
  });

  const totalDonationAmount =
    (
      await Donation.aggregate([
        {
          $match: { status: EDonationStatus.Success },
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
    status: EDonationStatus.Success,
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
    status: EDonationStatus.Success,
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

const generateDonationReceipt = async(res: Response, id: string) => {
  
  if(!isValidObjectId(id)){
    throw new AppError(httpStatus.BAD_REQUEST,"Invalid id")
  }
  const donation = await Donation.findById(id).populate('paymentId').lean()

  if(!donation){
    throw new AppError(httpStatus.NOT_FOUND,"Donation not found")
  }

  const isAnonymously =  donation.isAnonymously
  const donarPersonalInfo =   donation.donorPersonalInfo!
  const payment =  donation.paymentId as any as IPayment

  const data = [
    {
      heading: 'Donation:',
      values: [
        { name: 'Id', value: donation._id },
        { name: 'Asymonyes', value: isAnonymously ? 'Yes':'No' },
        { name: 'Date', value: donation.createdAt.toLocaleDateString() },
      ],
    },
    {
      heading: 'Campaign Information:',
      values: [
        { name: 'Name', value: donation.campaign.title },
        { name: 'Category', value: donation.campaign.category },
      ],
    },
    {
      heading: 'Personal Information:',
      values: donation.isAnonymously ? []:
      [
          { name: 'Full Name', value:donarPersonalInfo.fullName  },
        { name: 'Email Address', value: donarPersonalInfo.email },
        { name: 'Phone Number', value: donarPersonalInfo.fullName },
        { name: 'Address', value: Object.values(donarPersonalInfo.address).slice(0,-1).filter(_=>_).join(',') },
      ]
    },
    {
      heading: 'Payment Information:',
      values: [
        { name: 'Transaction Id', value: payment.transactionId },
        { name: 'Amount', value: payment.amount.toFixed(2) },
        { name: 'Currency', value: 'USD' },
        { name: 'Method', value: payment.method }
      ],
    },
  ];

  const color = {
    primary: '#04B563',
    black: '#000000',
  };

  const margin = 20
  const size = 'A4'
  
  const doc = new PDFDocument({ margin, size });
  let y = doc.y;
  let x =  margin
  doc.registerFont('regular', path.join(process.cwd(),'fonts/roboto/Roboto-Regular.ttf'))
  doc.registerFont('semi-bold', path.join(process.cwd(),'fonts/roboto/Roboto-Regular.ttf'));
  doc.registerFont('bold', path.join(process.cwd(),'fonts/roboto/Roboto-SemiBold.ttf'));

  doc.font('regular').fillColor(color.black);

  // doc.fillColor(color.primary).text('https://www.xyz.com',doc.page.width - 150,5,{align:'left',continued:false})
 
  doc.fontSize(30).fillColor(color.black).text('DonorHive', { align: 'center', continued: false });
  doc.moveDown(0.3);
  doc
    .fontSize(14)
    .fillColor(color.black)
    .opacity(0.8)
    .text('Donation Receipt', { align: 'center', underline: true });

     doc
    // .fontSize(12)
    // .fillColor(color.black)
    // .opacity(0.8)
    // .text('Date: ',{continued:true}).text(new Date().toDateString());

  doc.moveDown(3);


  
  x = doc.page.width / 2 - 70;
  y =  doc.y
  doc
    .font('bold')
    .fontSize(40)
    .fillColor(color.primary)
    .text('500', x, y, { continued: true })
    .font('regular')
    .fillColor(color.black)
    .opacity(0.7)
    .fontSize(25)
    .text('/USD', x, y + 12, { align: 'justify', continued: false });

  doc.moveDown(0.6);
  x = 20;
  y = doc.y;


  data.forEach((data) => {
   if(!data.values.length) return
    doc
      .font('semi-bold')
      .fontSize(14)
      .opacity(1)
      .fillColor(color.black)
      .text(data.heading, x, y, { align: 'left', continued: false });
    doc.moveDown(0.3);
    y = doc.y;
    data.values.forEach((value) => {
      doc
        .font('semi-bold')
        .fontSize(10)
        .opacity(1)
        .fillColor(color.black)
        .text(value.name, x, y)
        .font('regular')
        .text(': ' + value.value, x + 100, y);
      doc.moveDown(0.1);
      y = doc.y;
    });
    doc.moveDown(1);
    y = doc.y;
  });

  doc
    .fontSize(12)
    .text(
      `Thank you for your generous donation of ${donation.amount}. Your support helps us continue our mission.`,
      60,
      doc.page.height - 60
    );
  doc.pipe(fs.createWriteStream('/example')); // write to PDF
  doc.pipe(res); // HTTP response
  doc.end();
};

const DonationServices: Record<string, any> = {
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
  generateDonationReceipt,
};

export default DonationServices;
