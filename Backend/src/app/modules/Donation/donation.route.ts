import { Router } from 'express';
import DonationControllers from './donation.controller';
import validateRequest from '../../middlewares/validateRequest';
import DonationValidations from './donation.validation';
import authUserProvider from '../../middlewares/authUserProvider';
import { EUserRole } from '../User/user.interface';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/init',
  authUserProvider(EUserRole.Donor),
  validateRequest(DonationValidations.InitDonationValidationSchema),
  DonationControllers.initDonation
);

router.get('/manage', auth(EUserRole.Admin), DonationControllers.getDonationsForManage);
router.get('/my', auth(EUserRole.Donor), DonationControllers.getMyDonations);
router.get('/recent/my', auth(EUserRole.Donor), DonationControllers.getMyRecentDonations);
router.get('/recent', auth(EUserRole.Admin), DonationControllers.getDonationsForManage);
router.get('/my/:id/details', auth(EUserRole.Donor), DonationControllers.getMyDonationDetails);
router.get(
  '/manage/:id/details',
  auth(EUserRole.Admin),
  DonationControllers.getDonationDetailsForManage
);
router.get('/campaign/:id/latest', DonationControllers.getCampaignLatestDonations);
router.get('/campaign/:id', DonationControllers.getCampaignDonations);
router.get('/summary', DonationControllers.getDonationsSummary);
router.get('/:id/receipt', DonationControllers.generateDonationReceipt);
const DonationRouter = router;

export default DonationRouter;
