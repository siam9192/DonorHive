import { Router } from 'express';
import auth from '../../middlewares/auth';
import { EUserRole } from '../User/user.interface';
import UtilsControllers from './Utils.controller';

const router = Router();

router.get('/my-count', auth(EUserRole.Admin, EUserRole.Donor), UtilsControllers.getMyCountsFromDB);

const UtilsRouter = router;

export default UtilsRouter;
