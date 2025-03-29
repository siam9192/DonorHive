import { IParam, IResponse } from "../../../interfaces/response.interface";
import { IDonation, TMyDonation } from "../../../types/donation.type";
import { TProfile } from "../../../types/profile.type";
import { paramsToString } from "../../../utils/function";
import { baseApi } from "../../api/baseApi";

const donationApi = baseApi.injectEndpoints({
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
      query: ({ id, params }: { id: string; params: IParam[] }) => ({
        url: `/donations/campaign/${id}?${paramsToString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IDonation[]>) => {
        return response;
      },
      providesTags: ["campaign-donations"],
    }),
    requestDonation: builder.mutation({
      query: (body) => ({
        url: `/donations/init`,
        method: "POST",
        body,
      }),
      transformResponse: (response: IResponse<{ paymentUrl: string }>) => {
        return response;
      },
    }),
    getMyRecentDonations: builder.query({
      query: () => ({
        url: `/donations/recent/my`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<TMyDonation[]>) => {
        return response;
      },
    }),
    getMyDonations: builder.query({
      query: (params: IParam[]) => ({
        url: `/donations/my?${paramsToString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<TMyDonation[]>) => {
        return response;
      },
    }),
    getMyDonationDetails: builder.query({
      query: (id) => ({
        url: `/donations/my/${id}/details`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IDonation>) => {
        return response;
      },
    }),

    getRecentDonations: builder.query({
      query: () => ({
        url: `/donations/recent`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IDonation[]>) => {
        return response;
      },
    }),
    getDonationsForManage: builder.query({
      query: (params:IParam[]) => ({
        url: `/donations/manage?${paramsToString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IDonation[]>) => {
        return response;
      },
      providesTags:["manage-donations"]
    })
  }),
});

export const {
  useGetCampaignLatestDonationsQuery,
  useGetCampaignDonationsQuery,
  useRequestDonationMutation,
  useGetMyRecentDonationsQuery,
  useGetMyDonationsQuery,
  useGetMyDonationDetailsQuery,
  useGetRecentDonationsQuery,
 useGetDonationsForManageQuery,
} = donationApi;
