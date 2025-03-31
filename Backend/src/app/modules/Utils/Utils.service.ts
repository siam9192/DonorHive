import { objectId } from '../../utils/function';
import { IAuthUser } from '../Auth/auth.interface';
import Notification from '../Notification/notification.model';
import { EUserRole } from '../User/user.interface';

const getMyCountsFromDB = async (authUser: IAuthUser) => {
  const data: Record<string, number> = {};
  const newNotificationsTotal = await Notification.countDocuments({
    userId:objectId(authUser.id),
    isRead: false,
  });

  data.newNotificationsTotal = newNotificationsTotal;

  if (authUser.role === EUserRole.Donor) {
    const watchListedCampaignsTotal = 0;
    data.watchListedCampaignsTotal = watchListedCampaignsTotal;
  }
  return data;
};

const UtilsServices = {
  getMyCountsFromDB,
};

export default UtilsServices;
