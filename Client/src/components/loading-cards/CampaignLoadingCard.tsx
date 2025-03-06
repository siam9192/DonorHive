import React from "react";

const CampaignLoadingCard = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-md"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mt-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mt-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
      <div className="mt-4 h-3 w-full bg-gray-300 rounded"></div>
      <div className="flex justify-between mt-3">
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default CampaignLoadingCard;
