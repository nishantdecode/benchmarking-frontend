import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseUrl = "http://localhost:8081/api/executiveSummary";
export const baseUrl = "https://154.49.243.15:8002/api/executiveSummary";

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
  }),
});

export const { useGetItemMutation, useGetFiguresMutation, useGetAllYearsMutation } = summaryApi;
