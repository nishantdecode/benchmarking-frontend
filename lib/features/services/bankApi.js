import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ANALYTICS_API + "bank";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const bankApi = createApi({
  reducerPath: "bankApi",
  baseQuery,
  endpoints: (builder) => ({
    createBank: builder.mutation({
      query: (credentials) => ({
        url: "/create",
        method: "POST",
        body: credentials,
      }),
    }),
    getAllBanks: builder.mutation({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    getBank: builder.mutation({
      query: ({id}) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    updateBank: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/${id}`,
        method: "PUT",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useCreateBankMutation,
  useGetAllBanksMutation,
  useGetBankMutation,
  useUpdateBankMutation
} = bankApi;
