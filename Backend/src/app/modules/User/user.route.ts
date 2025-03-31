import { Router } from 'express';
import UserControllers from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import UserValidations from './user.validation';
import auth from '../../middlewares/auth';
import { EUserRole } from './user.interface';

const router = Router();

router.get('/manage', auth(EUserRole.Admin), UserControllers.getUsers);
router.get('/:id/details', auth(EUserRole.Admin), UserControllers.getUserDetails);
router.get('/summary', UserControllers.getUserSummary);
router.get('/recent', auth(EUserRole.Admin), UserControllers.getRecentUsersFromDB);
router.post('/createMany', UserControllers.createMany);
router.patch(
  '/:id/change-status',
  auth(EUserRole.Admin),
  validateRequest(UserValidations.ChangeUserStatusValidationSchema),
  UserControllers.changeUserStatus
);
router.delete('/:id', auth(EUserRole.Admin), UserControllers.userSoftDelete);

const UserRouter = router;

export default UserRouter;
