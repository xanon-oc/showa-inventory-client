import { baseApi } from "../../api/baseApi";

const sales = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addShoeToSale: builder.mutation({
      query: (data) => ({
        url: "/sales/addSale",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allShoes"],
    }),
  }),
});

export const { useAddShoeToSaleMutation } = sales;
