import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import PaymentServices from './payment.service';

const validatePayment = catchAsync(async (req: Request, res: Response) => {
  await PaymentServices.validatePayment(res, req.params.status, req.params.token);
});

const PaymentControllers = {
  validatePayment,
};

export default PaymentControllers;
