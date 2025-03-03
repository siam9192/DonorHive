import { Router } from 'express';
import UserControllers from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import UserValidations from './user.validation';

const router = Router();

router.get('/manage', UserControllers.getUsers);
router.get('/:id/details', UserControllers.getUserDetails);
router.get('/summary', UserControllers.getUserSummary);
router.post('/createMany', UserControllers.createMany);
router.put(
  '/:id/change-status',
  validateRequest(UserValidations.ChangeUserStatusValidationSchema),
  UserControllers.changeUserStatus
);

const UserRouter = router;

export default UserRouter;
