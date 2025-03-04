import { model, Schema, Types } from 'mongoose';
import { EPaymentMethod, EPaymentStatus, IPayment } from './payment.interface';

const PaymentModelSchema = new Schema<IPayment>(
  {
    transactionId: {
      type: String,
      minlength: 10,
      maxlength: 10,
      unique: true,
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
      default: null,
    },
    donationId: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      min: 1,
      required: true,
    },
    method: {
      type: String,
      enum: Object.values(EPaymentMethod),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(EPaymentStatus),
      default: EPaymentStatus.Pending,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = model<IPayment>('Payment', PaymentModelSchema);

export default Payment;
