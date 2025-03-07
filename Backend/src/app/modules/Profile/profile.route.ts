import { Router } from 'express';
import auth from '../../middlewares/auth';
import { EUserRole } from '../User/user.interface';
import ProfileControllers from './profile.controller';

const router = Router();

router.get('/my', auth(...Object.values(EUserRole)), ProfileControllers.getMyProfileFromDB);
router.put('/', auth(...Object.values(EUserRole)), ProfileControllers.updateMyProfile);

const ProfileRouter = router;

export default ProfileRouter;
