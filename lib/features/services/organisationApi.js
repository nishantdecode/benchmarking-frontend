import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = process.env.NEXT_PUBLIC_ENV === "DEV" ? process.env.NEXT_PUBLIC_DEV_AUTH_API + "organisation" : process.env.NEXT_PUBLIC_PROD_AUTH_API + "organisation";

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

export const organisationApi = createApi({
  reducerPath: "organisationApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    create: builder.mutation({
      query: ({ token, credentials }) => ({
        url: "/create",
        method: "POST",
        body: credentials,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllOrganisations: builder.mutation({
      query: ({ token }) => ({
        url: "/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllOrganisationNames: builder.mutation({
      query: ({ token }) => ({
        url: "/names",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getOrganisation: builder.mutation({
      query: ({ token, id }) => ({
        url: `/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateOrganisation: builder.mutation({
      query: ({ token, id, credentials }) => ({
        url: `/${id}`,
        method: "PUT",
        body: credentials,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteOrganisation: builder.mutation({
      query: ({ token, id }) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useGetAllOrganisationsMutation,
  useGetAllOrganisationNamesMutation,
  useGetOrganisationMutation,
  useUpdateOrganisationMutation,
  useDeleteOrganisationMutation
} = organisationApi;
