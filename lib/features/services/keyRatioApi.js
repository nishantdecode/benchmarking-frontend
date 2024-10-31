import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ENV === "DEV" ? process.env.NEXT_PUBLIC_DEV_ANALYTICS_API + "keyRatio" : process.env.NEXT_PUBLIC_PROD_ANALYTICS_API + "keyRatio";


const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const ratioApi = createApi({
  reducerPath: "ratioApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllYears: builder.mutation({
      query: () => ({
        url: "/years",
        method: "GET",
      }),
    }),
    getRatioBank: builder.mutation({
      query: (credentials) => ({
        url: "/ratioBank",
        method: "POST",
        body: credentials,
      }),
    }),
    getRatio: builder.mutation({
      query: (credentials) => ({
        url: "/ratio",
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
    getFiguresByCategory: builder.mutation({
      query: (credentials) => ({
        url: "/figuresCategory",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useGetRatioMutation, useGetRatioBankMutation, useGetFiguresMutation, useGetAllYearsMutation, useGetFiguresByCategoryMutation } = ratioApi;
