import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ANALYTICS_API + "individualBank";
// export const baseUrl = "http://154.49.243.15:8003/api/individualBank";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const individualBankApi = createApi({
  reducerPath: "individualBankApi",
  baseQuery,
  endpoints: (builder) => ({
    getTablesData: builder.mutation({
      query: (credentials) => ({
        url: "/tables",
        method: "POST",
        body: credentials,
      }),
    }),
    getCompetitionData: builder.mutation({
      query: (credentials) => ({
        url: "/competition",
        method: "POST",
        body: credentials,
      }),
    }),
    getTrendTable: builder.mutation({
      query: (credentials) => ({
        url: "/trend",
        method: "POST",
        body: credentials,
      }),
    }),
    getBankData: builder.mutation({
      query: (credentials) => ({
        url: "/bank",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetTablesDataMutation,
  useGetCompetitionDataMutation,
  useGetTrendTableMutation,
  useGetBankDataMutation
} = individualBankApi;
