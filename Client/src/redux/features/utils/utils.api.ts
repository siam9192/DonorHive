import { IParam, IResponse } from "../../../interfaces/response.interface";
import { baseApi } from "../../api/baseApi";

const utilsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyUtilsCount: builder.query({
      query: () => ({
        url: `/utils/my-count`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<Record<string, number>>) => {
        return response;
      },
      providesTags: ["my-utils-count"],
    }),
  }),
});

export const { useGetMyUtilsCountQuery } = utilsApi;
