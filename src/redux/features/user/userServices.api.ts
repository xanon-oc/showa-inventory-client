import { baseApi } from "../../api/baseApi";

const userServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addShoePolishService: builder.mutation({
      query: (data) => ({
        url: "/shoe-polish/addShoePolishRequest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addPolishRequest"],
    }),
    getSpecificShoePolishService: builder.query({
      query: (email) => ({
        url: `/shoe-polish/getAllShoePolishRequest/${email}`,
        method: "GET",
      }),
      providesTags: ["addPolishRequest"],
    }),
    addCustomizeShoe: builder.mutation({
      query: (data) => ({
        url: "/custom-shoe-design/addCustomShoeDesign",
        method: "POST",
        body: data,
      }),
    }),
    getAllShoeData: builder.query({
      query: () => ({
        url: "/shoe-polish/getAllShoePolishRequest",
        method: "GET",
      }),
      providesTags: ["shoePolishRequest"],
    }),
    getSpecificCustomizeShoes: builder.query({
      query: (email) => ({
        url: `/custom-shoe-design/getCustomShoeDesign/${email}`,
        method: "GET",
      }),
    }),
    verifyProductAuthenticity: builder.query({
      query: (productId) => {
        return {
          url: `/shoes/productVerification/${productId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddShoePolishServiceMutation,
  useGetSpecificShoePolishServiceQuery,
  useAddCustomizeShoeMutation,
  useGetSpecificCustomizeShoesQuery,
  useVerifyProductAuthenticityQuery,
  useGetAllShoeDataQuery,
} = userServices;
