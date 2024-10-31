import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ENV === "DEV" ? process.env.NEXT_PUBLIC_DEV_ANALYTICS_API + "individualBank" : process.env.NEXT_PUBLIC_PROD_ANALYTICS_API + "individualBank";


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
    exportData: builder.mutation({
      query: ({bankId, year, quarter}) => ({
        url: `/export?bankId=${bankId}&quarter=${quarter || ""}`,
        method: "GET",
      }),
    }),
    importData: builder.mutation({
      query: ({bankId, year, quarter, formData }) => ({
        url: `/import?bankId=${bankId}&quarter=${quarter || ""}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetTablesDataMutation,
  useGetCompetitionDataMutation,
  useGetTrendTableMutation,
  useGetBankDataMutation,
  useExportDataMutation,
  useImportDataMutation
} = individualBankApi;
