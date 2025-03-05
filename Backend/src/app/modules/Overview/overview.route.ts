import { Router } from 'express';
import auth from '../../middlewares/auth';
import { EUserRole } from '../User/user.interface';
import OverviewControllers from './overview.controller';

const router = Router();

router.get('/my/summary', auth(EUserRole.Donor), OverviewControllers.getDonorOverviewSummary);
router.get('/summary', OverviewControllers.getAdminOverviewSummary);
router.get('/top-donors', OverviewControllers.getTopDonors);

const OverviewRouter = router;

export default OverviewRouter;
