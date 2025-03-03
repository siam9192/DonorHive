import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import CampaignValidations from './campaign.validation';
import CampaignControllers from './campaign.controller';

const router = Router();

router.post(
  '/',
  validateRequest(CampaignValidations.CreateCampaignValidationSchema),
  CampaignControllers.createCampaign
);

router.post('/many', CampaignControllers.createManyCampaign);
router.put(
  '/:id',
  validateRequest(CampaignValidations.UpdateCampaignValidationSchema),
  CampaignControllers.updateCampaign
);
router.delete('/:id', CampaignControllers.softDeleteCampaign);

router.get('/', CampaignControllers.getCampaigns);
router.get('/manage', CampaignControllers.getCampaignsForManage);
router.get('/:slug/visit', CampaignControllers.getCampaignBySlug);
const CampaignRouter = router;

export default CampaignRouter;
