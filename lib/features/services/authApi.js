import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "http://localhost:8080/api/user";
// export const baseUrl = "https://benchmarking.brihatinfotech.com/api/user";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
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
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useVerifyTokenMutation,
} = authApi;
