import { baseApi } from "../../api/baseApi";

const salesHistory = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesHistory: builder.query({
      query: (query) => ({
        url: `/history/salesHistory/${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSalesHistoryQuery } = salesHistory;
