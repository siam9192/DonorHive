import { Router } from 'express';
import watchListItemControllers from './watch-list-item.controller';
import auth from '../../middlewares/auth';
import { EUserRole } from '../User/user.interface';

const router = Router();

router.post('/', auth(EUserRole.Donor), watchListItemControllers.createWatchListItem);

router.delete('/:campaignId', auth(EUserRole.Donor), watchListItemControllers.deleteWatchListItem);

router.get('/my', auth(EUserRole.Donor), watchListItemControllers.getMyWatchListItems);

const watchListItemRouter = router;

export default watchListItemRouter;
