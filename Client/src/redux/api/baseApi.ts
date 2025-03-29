import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import envConfig from "../../config/env.config";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    // credentials:"include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({}),
  tagTypes: [
    "my-profile",
    "current-user",
    "campaigns",
    "campaign-visit",
    "campaign-latest-donations",
    "campaign-donations",
    "manage-campaigns",
    "manage-users",
    "user-details",
    "manage-donations"
  ],
});
