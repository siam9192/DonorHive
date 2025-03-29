import { IParam, IResponse } from "../../../interfaces/response.interface";
import { IAdminOverviewSummary, IMySummary, ITopDonor } from "../../../types/overview.type";
import { baseApi } from "../../api/baseApi";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySummary: builder.query({
      query: () => ({
        url: `overview/my/summary`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IMySummary>) => {
        return response;
      },
    }),
    getAdminSummary: builder.query({
      query: () => ({
        url: `overview/summary`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IAdminOverviewSummary>) => {
        return response;
      },
    }),
    getTopDonors: builder.query({
      query: () => ({
        url: `/overview/top-donors`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ITopDonor[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetMySummaryQuery, useGetAdminSummaryQuery, useGetTopDonorsQuery } = overviewApi;
