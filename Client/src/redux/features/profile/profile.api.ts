import { IResponse } from "../../../interfaces/response.interface";
import { TProfile } from "../../../types/profile.type";
import { baseApi } from "../../api/baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: (body) => ({
        url: "/profile/my",
        method: "GET",
        body,
      }),
      transformResponse: (response: IResponse<TProfile>) => {
        return response;
      },
      providesTags: ["my-profile"],
    }),
  }),
});

export const { useGetMyProfileQuery } = profileApi;
