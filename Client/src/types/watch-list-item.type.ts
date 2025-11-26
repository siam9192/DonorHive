import { ICampaign } from "./campaign.type";
import { IUser } from "./user.type";

export interface IWatchListItem {
  _id: string;
  campaign: ICampaign;
  user: IUser;
}
