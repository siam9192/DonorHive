import React from 'react'
import CampaignHeader from '../components/sections/Campaigns/CampaignHeader'
import ShowCampaigns from '../components/sections/Campaigns/ShowCampaigns'
import CampaignFilterBox from '../components/sections/Campaigns/CampaignFilterBox'

const Campaigns = () => {
  return (
    <div>
        <CampaignHeader/>
        <CampaignFilterBox/>
        <ShowCampaigns/>
    </div>
  )
}

export default Campaigns