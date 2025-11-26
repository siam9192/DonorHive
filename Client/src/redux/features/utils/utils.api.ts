import { IResponse } from "../../../interfaces/response.interface";
import { TExistingCategory } from "../../../types/category.type";
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
    getAllExistingCategories: builder.query({
      query: () => ({
        url: `/utils/exist-categories`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<TExistingCategory[]>) => {
        return response;
      },
      providesTags: ["my-utils-count"],
    }),
  }),
});

export const { useGetMyUtilsCountQuery, useGetAllExistingCategoriesQuery } = utilsApi;
