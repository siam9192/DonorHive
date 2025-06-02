import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import CampaignValidations from './campaign.validation';
import CampaignControllers from './campaign.controller';
import auth from '../../middlewares/auth';
import { EUserRole } from '../User/user.interface';

const router = Router();

router.post(
  '/',
  auth(EUserRole.Admin),
  validateRequest(CampaignValidations.CreateCampaignValidationSchema),
  CampaignControllers.createCampaign
);

router.post('/many', CampaignControllers.createManyCampaign);
router.put(
  '/:id',
  auth(EUserRole.Admin),
  validateRequest(CampaignValidations.UpdateCampaignValidationSchema),
  CampaignControllers.updateCampaign
);
router.delete('/:id', auth(EUserRole.Admin), CampaignControllers.softDeleteCampaign);

router.get('/', CampaignControllers.getCampaigns);
router.get('/manage', auth(EUserRole.Admin), CampaignControllers.getCampaignsForManage);
router.get('/manage/:id', auth(EUserRole.Admin), CampaignControllers.getCampaignByIdForManage);
router.get('/:slug/visit', CampaignControllers.getCampaignBySlug);
router.get('/related/:slug', CampaignControllers.getRelatedCampaignsFromDB);
router.get('/recent', CampaignControllers.getRecentCampaigns);
router.get('/almost-completed', CampaignControllers.getAlmostCompletedCampaigns);
router.get('/random',CampaignControllers.getRandomCampaign)
const CampaignRouter = router;

export default CampaignRouter;
