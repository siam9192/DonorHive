import { Router } from 'express';
import RegistrationRequestControllers from './registrationRequest.controller';

const router = Router();

router.patch('/cancel/:token', RegistrationRequestControllers.cancelRegistrationRequest);

const RegistrationRequestRouter = router;

export default RegistrationRequestRouter;
