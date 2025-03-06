import { IParam, IResponse } from "../../../interfaces/response.interface";
import { ICampaign } from "../../../types/campaign.type";
import { paramsToString } from "../../../utils/function";
import { baseApi } from "../../api/baseApi";

const campaignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query({
      query: (params: IParam[]) => ({
        url: `/campaigns?${paramsToString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ICampaign[]>) => {
        return response;
      },
      providesTags: ["campaigns"],
    }),
    getCampaignForVisit: builder.query({
      query: (slug: string) => ({
        url: `/campaigns/${slug}/visit`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ICampaign>) => {
        return response;
      },
      providesTags: ["campaign-visit"],
    }),
    getRecentCampaigns: builder.query({
      query: () => ({
        url: `/campaigns/recent`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ICampaign[]>) => {
        return response;
      },
    }),
    getRelatedCampaigns: builder.query({
      query: (slug: string) => ({
        url: `/campaigns/related/${slug}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ICampaign[]>) => {
        return response;
      },
    }),
    getAlmostCompletedCampaigns: builder.query({
      query: () => ({
        url: `/campaigns/almost-completed`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ICampaign[]>) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  useGetCampaignForVisitQuery,
  useGetRelatedCampaignsQuery,
  useGetRecentCampaignsQuery,
  useGetAlmostCompletedCampaignsQuery,
} = campaignApi;
