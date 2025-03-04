import { Router } from 'express';
import PaymentControllers from './payment.controller';

const router = Router();

router.get('/validate/:status/:token', PaymentControllers.validatePayment);
router.post('/validate/:status/:token', PaymentControllers.validatePayment);
const PaymentRouter = router;

export default PaymentRouter;
