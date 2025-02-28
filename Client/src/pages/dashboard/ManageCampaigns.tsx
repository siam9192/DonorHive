import React from "react";
import CampaignsSummary from "../../components/sections/Dashboard/ManageCamapaigns/CampaignsSummary";
import DashboardShowCampaigns from "../../components/sections/Dashboard/ManageCamapaigns/DashboardShowCampaigns";
import { FaPlus } from "react-icons/fa";
import AddCampaignPopup from "../../components/ui/AddCampaignPopup";

const ManageCampaigns = () => {
  return (
    <div>
      <CampaignsSummary />

      <DashboardShowCampaigns />
         {/* Add Campaign  */}
    <AddCampaignPopup>
    <button className="flex items-center gap-2 fixed bottom-10  lg:right-20 md:right-10 right-5 md:p-3 p-2  rounded-full bg-secondary">
          <span className="text-2xl text-black">
          <FaPlus />
          </span>
          <p className="font-medium lg:block hidden">
            Add Campaign
          </p>
      </button>
    </AddCampaignPopup>
    </div>
  );
};

export default ManageCampaigns;
