import AppError from '../../Errors/AppError';
import { calculatePagination } from '../../helpers/paginationHelper';
import httpStatus from '../../shared/http-status';
import { IPaginationOptions } from '../../types';
import { bcryptHash } from '../../utils/bycrypt';
import { isValidObjectId, objectId } from '../../utils/function';
import { EUserRole, EUserStatus, IFilterUser, TUserStatus } from './user.interface';
import User from './user.model';

const getUsersFromDB = async (filter: IFilterUser, paginationOptions: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

  const { searchTerm, status } = filter;

  const whereConditions: any = {
    status: {
      $not: {
        $eq: EUserStatus.Deleted,
      },
    },
  };

  if (searchTerm) {
    if (isValidObjectId(searchTerm)) {
      whereConditions._id = objectId(searchTerm);
    } else {
      whereConditions.$or = [
        {
          email: { $regex: searchTerm, $options: 'i' },
        },
        {
          fullName: { $regex: searchTerm, $options: 'i' },
        },
      ];
    }
  }

  if (status) {
    whereConditions.status = status;
  }

  const sort = {
    [sortBy]: sortOrder,
  };

  const select = {
    _id: true,
    fullName: true,
    profilePhotoUrl: true,
    email: true,
    provider: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  };

  const users = await User.find(whereConditions).sort(sort).select(select).skip(skip).limit(limit);

  const data = users;

  const totalResult = await User.countDocuments(whereConditions);
  const total = await User.countDocuments();
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

const getUserDetailsFromDB = async (id: string) => {
  const user = await User.findOne({
    _id: objectId(id),
    status: {
      $not: {
        $eq: EUserStatus.Deleted,
      },
    },
  });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  const donatedAmount = 3000;
  const data = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePhotoUrl: user.profilePhotoUrl,
    phoneNumber: user.phoneNumber,
    address: user.address,
    role: user.role,
    provider: user.provider,
    status: user.status,
    donatedAmount,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return data;
};

const createManyUsers = async (users: any[]) => {
  users.map(async (user) => {});
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    user.password = await bcryptHash(user.password);
    users[i] = user;
  }
  return await User.insertMany(users);
};

const changeUserStatusIntoDB = async (id: string, payload: { status: TUserStatus }) => {
  const user = await User.findById(id);
  if (!user || user.status === EUserStatus.Deleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  } else if (user.role === EUserRole.Admin) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, `Admin status not changeable `);
  } else if (user.status === payload.status) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, `User is already ${payload.status}`);
  }

  const updateStatus = await User.updateOne(
    {
      _id: objectId(id),
    },
    {
      status: payload.status,
    }
  );

  if (!updateStatus.modifiedCount) throw new AppError(500, 'Status could not be changed');
  return null;
};

const softDeleteUserFromDB = async (id: string) => {
  const user = await User.findOne({
    _id: objectId(id),
    status: {
      $not: {
        $eq: EUserStatus.Deleted,
      },
    },
  });
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  else if (user.role === EUserRole.Admin)
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Admin is not deletable');

  const deleteStatus = await User.deleteOne({
    _id: objectId(id),
  });

  if (!deleteStatus.deletedCount) throw new AppError(500, 'User could not be deleted');
  return null;
};

const getRecentUsersFromDB = async () => {
  const recentDate = new Date(new Date().toDateString());

  recentDate.setDate(recentDate.getDate() - 15);

  const users = await User.find(
    {
      createdAt: {
        $gte: recentDate,
      },
      status: {
        $not: {
          $eq: EUserStatus.Deleted,
        },
      },
    },
    {
      _id: true,
      fullName: true,
      profilePhotoUrl: true,
      email: true,
      provider: true,
    }
  )
    .sort({
      createdAt: -1,
    })
    .limit(5);

  return users;
};

const getUsersSummaryFromDB = async () => {
  const total = await User.countDocuments({
    status: {
      $not: {
        $eq: EUserStatus.Deleted,
      },
    },
  });

  const totalActive = await User.countDocuments({
    status: EUserStatus.Active,
  });
  const totalBlocked = await User.countDocuments({
    status: EUserStatus.Blocked,
  });
  const totalDeleted = await User.countDocuments({
    status: EUserStatus.Deleted,
  });

  return {
    total,
    totalActive,
    totalBlocked,
    totalDeleted,
  };
};

const UserServices = {
  getUsersFromDB,
  createManyUsers,
  getUserDetailsFromDB,
  changeUserStatusIntoDB,
  softDeleteUserFromDB,
  getRecentUsersFromDB,
  getUsersSummaryFromDB,
};

export default UserServices;
