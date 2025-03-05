import { Router } from 'express';
import AuthRouter from '../modules/Auth/auth.route';
import UserRouter from '../modules/User/user.route';
import ProfileRouter from '../modules/Profile/profile.route';
import CampaignRouter from '../modules/Campaign/campaign.route';
import DonationRouter from '../modules/Donation/donation.route';
import PaymentRouter from '../modules/Payment/payment.route';
import NotificationRouter from '../modules/Notification/notification.route';
import OverviewRouter from '../modules/Overview/overview.route';

type TModuleRoutes = { path: string; router: Router }[];

const router = Router();
const moduleRoutes: TModuleRoutes = [
  {
    path: '/auth',
    router: AuthRouter,
  },
  {
    path: '/users',
    router: UserRouter,
  },
  {
    path: '/profile',
    router: ProfileRouter,
  },
  {
    path: '/campaigns',
    router: CampaignRouter,
  },
  {
    path: '/donations',
    router: DonationRouter,
  },
  {
    path: '/payments',
    router: PaymentRouter,
  },
  {
    path: '/notifications',
    router: NotificationRouter,
  },
  {
    path: '/overview',
    router: OverviewRouter,
  },
];

const routes = moduleRoutes.map((route) => router.use(route.path, route.router));

export default routes;
