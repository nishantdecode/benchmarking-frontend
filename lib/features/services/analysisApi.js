import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ENV === "DEV" ? process.env.NEXT_PUBLIC_DEV_ANALYTICS_API + "itemAnalysis" : process.env.NEXT_PUBLIC_PROD_ANALYTICS_API + "itemAnalysis";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const analysisApi = createApi({
  reducerPath: "analysisApi",
  baseQuery,
  endpoints: (builder) => ({
    getItemBank: builder.mutation({
      query: (credentials) => ({
        url: "/itemBank",
        method: "POST",
        body: credentials,
      }),
    }),
    getRankByCategory: builder.mutation({
      query: (credentials) => ({
        url: "/rank",
        method: "POST",
        body: credentials,
      }),
    }),
    getItemByCategory: builder.mutation({
      query: (credentials) => ({
        url: "/itemCategory",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetItemBankMutation, useGetRankByCategoryMutation, useGetItemByCategoryMutation } = analysisApi;
