import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProfile } from "./userSlice";

export const userServiceApi = createApi({
  reducerPath: "userServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/users/",
    credentials: "include",
  }),
  keepUnusedDataFor: 60 * 60 * 24,
  tagTypes: ["users"],
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      providesTags: ["users"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfile(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    postUser: build.mutation({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    loginUser: build.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetProfileQuery, usePostUserMutation, useLoginUserMutation } =
  userServiceApi;
