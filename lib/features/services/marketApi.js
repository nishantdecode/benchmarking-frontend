import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ENV === "DEV" ? process.env.NEXT_PUBLIC_DEV_ANALYTICS_API + "marketShare" : process.env.NEXT_PUBLIC_PROD_ANALYTICS_API + "marketShare";


const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllYears: builder.mutation({
      query: () => ({
        url: "/years",
        method: "GET",
      }),
    }),
    getIndividualBankData: builder.mutation({
      query: (credentials) => ({
        url: "/individualBank",
        method: "POST",
        body: credentials,
      }),
    }),
    getMultipleBankData: builder.mutation({
      query: (credentials) => ({
        url: "/multipleBank",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetIndividualBankDataMutation, useGetMultipleBankDataMutation, useGetAllYearsMutation } = marketApi;
