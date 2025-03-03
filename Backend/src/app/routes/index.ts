import { Router } from 'express';
import AuthRouter from '../modules/Auth/auth.route';
import UserRouter from '../modules/User/user.route';
import ProfileRouter from '../modules/Profile/profile.route';
import CampaignRouter from '../modules/Campaign/campaign.route';

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
];

const routes = moduleRoutes.map((route) => router.use(route.path, route.router));

export default routes;
