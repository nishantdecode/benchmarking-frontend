import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl =
  process.env.NEXT_PUBLIC_ENV === "DEV"
    ? process.env.NEXT_PUBLIC_DEV_AUTH_API + "user"
    : process.env.NEXT_PUBLIC_PROD_AUTH_API + "user";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    refresh: builder.mutation({
      query: ({ token }) => ({
        url: "/refreshToken",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    verifyToken: builder.mutation({
      query: ({ token }) => ({
        url: "/verifyToken",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    sendOtp: builder.mutation({
      query: (credentials) => ({
        url: "/sendOtp",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/verifyOtp",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/resetPassword",
        method: "POST",
        body: credentials,
      }),
    }),
    getAllUsers: builder.mutation({
      query: ({ token }) => ({
        url: "/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUser: builder.mutation({
      query: ({ token, id }) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllAdmins: builder.mutation({
      query: ({ token }) => ({
        url: "/admin/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllUsersOfAdmin: builder.mutation({
      query: ({ token }) => ({
        url: "/admin/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAdmin: builder.mutation({
      query: ({ token, id }) => ({
        url: `/admin/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ token, id, credentials }) => ({
        url: `/${id}`,
        method: "PUT",
        body: credentials,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ token, id }) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllUsersMutation,
  useGetUserMutation,
  useGetAdminMutation,
  useGetAllAdminsMutation,
  useGetAllUsersOfAdminMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
  useVerifyTokenMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
