import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ANALYTICS_API + "itemAnalysis";
// export const baseUrl = "http://154.49.243.15:8003/api/itemAnalysis";

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
