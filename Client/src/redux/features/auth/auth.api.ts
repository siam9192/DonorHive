import { IResponse } from "../../../interfaces/response.interface";
import { IME } from "../../../types/auth.type";
import { baseApi } from "../../api/baseApi";
import Cookies from "js-cookie";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: IResponse<null>) => {
        return response;
      },
    }),
    verifyRegistration: builder.mutation({
      query: (token) => ({
        url: `/auth/register/verify/${token}`,
        method: "POST",
      }),
      transformResponse: (response: IResponse<null>) => {
        return response;
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
      transformResponse: (response: IResponse<{ accessToken: string; refreshToken: string }>) => {
        if (response.success) {
          const { accessToken, refreshToken } = response.data;
          Cookies.set("accessToken", accessToken);
          Cookies.set("refreshToken", refreshToken);
        }
        return response;
      },
      invalidatesTags: ["current-user"],
    }),
    googleCallback: builder.mutation({
      query: (body) => ({
        url: `/auth/callback/google`,
        method: "POST",
        body,
      }),
      transformResponse: (response: IResponse<{ accessToken: string; refreshToken: string }>) => {
        if (response.success) {
          const { accessToken, refreshToken } = response.data;
          Cookies.set("accessToken", accessToken);
          Cookies.set("refreshToken", refreshToken);
        }
        return response;
      },
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/current-user",
        method: "GET",
      }),
      transformResponse: (response: IResponse<IME>) => {
        return response;
      },
      providesTags: ["current-user"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyRegistrationMutation,
  useLoginMutation,
  useGoogleCallbackMutation,
  useGetCurrentUserQuery,
} = authApi;
