import { Router } from 'express';
import NotificationControllers from './notification.controller';
import auth from '../../middlewares/auth';
import { EUserRole } from '../User/user.interface';

const router = Router();

router.get('/my', auth(...Object.values(EUserRole)), NotificationControllers.getMyNotifications);

router.patch(
  '/my/read-all',
  auth(...Object.values(EUserRole)),
  NotificationControllers.setAsReadMyAllNotificationsIntoDB
);
const NotificationRouter = router;

export default NotificationRouter;
