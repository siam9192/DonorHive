import AppError from '../../Errors/AppError';
import httpStatus from '../../shared/http-status';
import { objectId } from '../../utils/function';
import { IAuthUser } from '../Auth/auth.interface';
import { EUserStatus, IUser } from '../User/user.interface';
import User from '../User/user.model';

const getMyProfileFromDB = async (authUser: IAuthUser) => {
  const selectStr =
    '_id fullName profilePhotoUrl email phoneNumber address role provider status createdAt updatedAt';
  const user = await User.findOne({
    _id: objectId(authUser.id),
    status: {
      $not: {
        $eq: EUserStatus.Deleted,
      },
    },
  }).select(selectStr);
  if (!user) throw new AppError(httpStatus.BAD_GATEWAY, 'Bad Gateway!');
  return user;
};

const updateMyProfileIntoDB = async (authUser: IAuthUser, payload: Partial<IUser>) => {
  const user = await User.findOne({
    _id: objectId(authUser.id),
  });

  if (!user) throw new AppError(httpStatus.BAD_GATEWAY, 'Bad Gateway!');

  const data = await User.findByIdAndUpdate(authUser.id, payload, { new: true });

  return data;
};

const ProfileServices = {
  getMyProfileFromDB,
  updateMyProfileIntoDB,
};

export default ProfileServices;
