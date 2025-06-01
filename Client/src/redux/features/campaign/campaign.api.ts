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
    getCampaignsForManage: builder.query({
      query: (params: IParam[]) => ({
        url: `/campaigns/manage?${paramsToString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ICampaign[]>) => {
        return response;
      },
      providesTags: ["manage-campaigns"],
    }),
    getCampaignByIdForManage: builder.query({
      query: (id) => ({
        url: `/campaigns/manage/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ICampaign>) => {
        return response;
      },
    }),
    deleteCampaign: builder.mutation({
      query: (id: string) => ({
        url: `/campaigns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["manage-campaigns"],
    }),
    addCampaign: builder.mutation({
      query: (payload: any) => ({
        url: `/campaigns`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["manage-campaigns"],
    }),
    updateCampaign: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/campaigns/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["manage-campaigns"],
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  useGetCampaignForVisitQuery,
  useGetRelatedCampaignsQuery,
  useGetRecentCampaignsQuery,
  useGetAlmostCompletedCampaignsQuery,
  useGetCampaignsForManageQuery,
  useGetCampaignByIdForManageQuery,
  useDeleteCampaignMutation,
  useAddCampaignMutation,
  useUpdateCampaignMutation,
} = campaignApi;
