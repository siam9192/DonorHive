import envConfig from '../../config/env.config';
import AppError from '../../Errors/AppError';
import jwtHelpers from '../../helpers/jwtHelpers';
import httpStatus from '../../shared/http-status';
import { objectId } from '../../utils/function';
import { ERegistrationRequestStatus } from './registrationRequest.interface';
import RegistrationRequest from './registrationRequest.model';

const cancelRegistrationRequest = async (token: string) => {
  let decode;
  try {
    decode = (await jwtHelpers.verifyToken(
      token,
      envConfig.jwt.accountVerificationTokenSecret as string
    )) as {
      requestId: string;
      email: string;
    };
  } catch (error) {}
  if (!decode)
    throw new AppError(httpStatus.BAD_REQUEST, 'Maybe this link is expired or already used');

  const request = await RegistrationRequest.findOne({
    _id: objectId(decode.requestId),
    expireAt: {
      $gt: new Date(),
    },
  });

  if (!request)
    throw new AppError(httpStatus.BAD_REQUEST, 'Maybe this link is expired or already used');

  const updateStatus = await RegistrationRequest.updateOne(
    {
      _id: objectId(decode.requestId),
    },
    {
      status: ERegistrationRequestStatus.CANCELED,
    }
  );

  if (!updateStatus.modifiedCount) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }

  return null;
};

const RegistrationRequestServices = {
  cancelRegistrationRequest,
};

export default RegistrationRequestServices;
