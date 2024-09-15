import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ENV === "DEV" ? process.env.NEXT_PUBLIC_DEV_ANALYTICS_API + "executiveSummary" : process.env.NEXT_PUBLIC_PROD_ANALYTICS_API + "executiveSummary";


const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const summaryApi = createApi({
  reducerPath: "summaryApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllYears: builder.mutation({
      query: () => ({
        url: "/years",
        method: "GET",
      }),
    }),
    getItem: builder.mutation({
      query: (credentials) => ({
        url: "/item",
        method: "POST",
        body: credentials,
      }),
    }),
    getFigures: builder.mutation({
      query: (credentials) => ({
        url: "/figures",
        method: "POST",
        body: credentials,
      }),
    }),
    getMetric: builder.query({
      query: ({ interval, startPeriod, endPeriod }) => ({
        url: `/metric?interval=${interval}&startPeriod=${startPeriod || ""}&endPeriod=${endPeriod || ""}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetItemMutation, useGetFiguresMutation, useGetAllYearsMutation, useGetMetricQuery } = summaryApi;
