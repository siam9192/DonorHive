import { IParam, IResponse } from "../../../interfaces/response.interface";
import { IDonation, TMyDonation } from "../../../types/donation.type";
import { INotification } from "../../../types/notification.type";
import { TProfile } from "../../../types/profile.type";
import { paramsToString } from "../../../utils/function";
import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: () => ({
        url: `/notifications/my`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<INotification[]>) => {
        return response;
      },
      providesTags: ["my-notifications"],
    }),
    setAsReadMyAllNotifications: builder.mutation({
      query: () => ({
        url: `/notifications/my/read-all`,
        method: "PATCH",
      }),
      transformResponse: (response: IResponse<INotification[]>) => {
        return response;
      },
      invalidatesTags: ["my-utils-count"],
    }),
  }),
});

export const { useGetMyNotificationsQuery, useSetAsReadMyAllNotificationsMutation } =
  notificationApi;
