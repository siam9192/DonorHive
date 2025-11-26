import { IParam, IResponse } from "../../../interfaces/response.interface";
import { IWatchListItem } from "../../../types/watch-list-item.type";
import { paramsToString } from "../../../utils/function";
import { baseApi } from "../../api/baseApi";

const watchListItemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWatchListItem: builder.mutation({
      query: (payload) => ({
        url: `/watch-list-items`,
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: IResponse<null>) => {
        return response;
      },
    }),
    deleteWatchListItem: builder.mutation({
      query: (campaignId: string) => ({
        url: `/watch-list-items/${campaignId}`,
        method: "DELETE",
      }),
      transformResponse: (response: IResponse<null>) => {
        return response;
      },
      invalidatesTags: ["my-watch-list-items"],
    }),
    getMyWatchListedItems: builder.query({
      query: (params: IParam[]) => ({
        url: `/watch-list-items/my?${paramsToString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IWatchListItem[]>) => {
        return response;
      },
      providesTags: ["my-watch-list-items"],
    }),
  }),
});

export const {
  useCreateWatchListItemMutation,
  useDeleteWatchListItemMutation,
  useGetMyWatchListedItemsQuery,
} = watchListItemApi;
