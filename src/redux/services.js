import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAllTransactions } from "./slice";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/transactions/",
    Credential: true,
  }),
  keepUnusedDataFor: 60 * 60 * 24 * 7,
  tagTypes: ["transactions"],
  endpoints: (build) => ({
    getTransactions: build.query({
      query: () => ({
        url: "get-transactions",
        method: "GET",
      }),
      providesTags: ["transactions"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllTransactions(data.transactions));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    postTransactions: build.mutation({
      query: (data) => ({
        url: "post-transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transactions"],
    }),
    deleteTransactions: build.mutation({
      query: (id) => ({
        url: `delete-transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions"],
    }),
    updateTransactions: build.mutation({
      query: (data) => ({
        url: `update-transactions/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  usePostTransactionsMutation,
  useDeleteTransactionsMutation,
  useUpdateTransactionsMutation,
} = serviceApi;
