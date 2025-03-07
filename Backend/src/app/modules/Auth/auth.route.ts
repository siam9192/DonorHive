import { Router } from 'express';
import AuthControllers from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import AuthValidations from './auth.validation';
import auth from '../../middlewares/auth';
import { EUserRole } from '../User/user.interface';

const router = Router();

router.post(
  '/register',
  validateRequest(AuthValidations.RegisterValidationSchema),
  AuthControllers.register
);
router.post('/register/verify/:token', AuthControllers.verifyRegistration);
router.post('/callback/google', AuthControllers.googleCallback);
router.post(
  '/login',
  validateRequest(AuthValidations.LoginValidationSchema),
  AuthControllers.login
);
router.post(
  '/change-password',
  auth(...Object.values(EUserRole)),
  validateRequest(AuthValidations.ChangePasswordValidationSchema),
  AuthControllers.changePassword
);
router.get('/access-token', AuthControllers.getAccessToken);
router.get('/current-user', auth(...Object.values(EUserRole)), AuthControllers.getMe);
const AuthRouter = router;

export default AuthRouter;
