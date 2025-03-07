import { IParam, IResponse } from "../../../interfaces/response.interface";
import { IMySummary } from "../../../types/overview.type";
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
  }),
});

export const { useGetMySummaryQuery } = overviewApi;
