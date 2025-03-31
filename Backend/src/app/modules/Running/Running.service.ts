import { ECampaignStatus } from '../Campaign/campaign.interface';
import Campaign from '../Campaign/campaign.model';
import { ERegistrationRequestStatus } from '../RegistrationRequest/registrationRequest.interface';
import RegistrationRequest from '../RegistrationRequest/registrationRequest.model';

const Run = async () => {
  setInterval(
   handel ,
    1000 * 60 * 5
  );

  function handel (){
    async () => {
        await Campaign.updateMany(
          {
            startAt: {
              $lte: new Date(),
            },
            endAt: {
              $gt: new Date(),
            },
            status: ECampaignStatus.NotStarted,
          },
          {
            status: ECampaignStatus.Active,
          }
        );
  
        await Campaign.updateMany(
          {
            status: ECampaignStatus.Active,
            $expr: { $gte: ['$raisedAmount', '$targetAmount'] },
          },
          {
            $set: { status: ECampaignStatus.Completed },
          }
        );
  
        await Campaign.updateMany(
          {
            status: ECampaignStatus.Active,
            $expr: { $lt: ['$raisedAmount', '$targetAmount'] },
            endAt: {
              $lte: new Date(),
            },
          },
          {
            $set: {
              status: ECampaignStatus.Incomplete,
            },
          }
        );
  
        await RegistrationRequest.updateMany(
          {
            status: ERegistrationRequestStatus.PENDING,
            expireAt: {
              $lte: new Date(),
            },
          },
          {
            $set: {
              status: ERegistrationRequestStatus.EXPIRED,
            },
          }
        );
      }
  }
};

const RunningServices = {
  Run,
};

export default RunningServices;
