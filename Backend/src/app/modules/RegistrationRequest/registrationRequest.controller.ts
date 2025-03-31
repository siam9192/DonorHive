import { Request, Response } from 'express';
import httpStatus from '../../shared/http-status';
import catchAsync from '../../utils/catchAsync';
import { sendSuccessResponse } from '../../utils/response';
import Pick from '../../utils/pick';
import { paginationOptionKeys } from '../../utils/constant';
import RegistrationRequestServices from './registrationRequest.service';

const cancelRegistrationRequest = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await RegistrationRequestServices.cancelRegistrationRequest(req.params.token);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Request canceled successfully',
    data: result,
  });
});

const RegistrationRequestControllers = {
  cancelRegistrationRequest,
};

export default RegistrationRequestControllers;
