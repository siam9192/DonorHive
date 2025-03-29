import { IParam, IResponse } from "../../../interfaces/response.interface";
import { TProfile } from "../../../types/profile.type";
import { IUser } from "../../../types/user.type";
import { paramsToString } from "../../../utils/function";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   getUsersForManage: builder.query({
      query: (params:IParam[]) => ({
        url: `/users/manage?${paramsToString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<IUser[]>) => {
        return response;
      },
      providesTags: ["manage-users"],
    }),
    updateMyProfile: builder.mutation({
      query: (body) => ({
        url: "/profile",
        method: "PUT",
        body,
      }),
      transformResponse: (response: IResponse<null>) => {
        return response;
      },
      invalidatesTags: ["current-user"],
    }),
    changeUserStatus: builder.mutation({
      query: ({id,payload}) => ({
        url: `/users/${id}/change-status`,
        method: "PATCH",
        body:payload
      }),
      invalidatesTags: ["manage-users","user-details"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["manage-users"],
    }),
    getUserForManage:builder.query({
        query: (id) => ({
          url: `/users/${id}/details`,
          method: "GET",
        
        }),
        providesTags:["user-details"],
        transformResponse: (response: IResponse<IUser>) => {
          return response;
        },

      }),
    
  }),
});

export const { useGetUsersForManageQuery,useGetUserForManageQuery,useChangeUserStatusMutation,useDeleteUserMutation } = userApi;
