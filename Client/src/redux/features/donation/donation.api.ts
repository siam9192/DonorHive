import { IParam, IResponse } from "../../../interfaces/response.interface";
import { IDonation } from "../../../types/donation.type";
import { TProfile } from "../../../types/profile.type";
import { paramsToString } from "../../../utils/function";
import { baseApi } from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignLatestDonations: builder.query({
      query: (id: string) => ({
        url: `/donations/campaign/${id}/latest`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IDonation[]>) => {
        return response;
      },
      providesTags: ["campaign-latest-donations"],
    }),
    getCampaignDonations: builder.query({
      query: ({id,params}:{id: string,params:IParam[]}) => ({
        url: `/donations/campaign/${id}?${paramsToString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IDonation[]>) => {
        return response;
      },
      providesTags: ["campaign-donations"],
    }),
  }),
});

export const { useGetCampaignLatestDonationsQuery, useGetCampaignDonationsQuery } = profileApi;
