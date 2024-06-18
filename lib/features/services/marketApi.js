import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseUrl = process.env.NEXT_PUBLIC_ANALYTICS_API + "marketShare";
export const baseUrl = "https://analytic.benchmarking.brihatinfotech.com/api/marketShare";
// export const baseUrl = "https://analytic.benchmarking.brihatinfotech.com/api/marketShare";


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
