import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ENV === "DEV" ? process.env.NEXT_PUBLIC_DEV_ANALYTICS_API + "commonSize" : process.env.NEXT_PUBLIC_PROD_ANALYTICS_API + "commonSize";


const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const sizeApi = createApi({
  reducerPath: "sizeApi",
  baseQuery,
  endpoints: (builder) => ({
    getSizeByBank: builder.mutation({
      query: (credentials) => ({
        url: "/individualBank",
        method: "POST",
        body: credentials,
      }),
    }),
    getSizeOfBanks: builder.mutation({
      query: (credentials) => ({
        url: "/multipleBank",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetSizeByBankMutation, useGetSizeOfBanksMutation } = sizeApi;
