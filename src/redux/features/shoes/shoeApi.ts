import { baseApi } from "../../api/baseApi";

const shoeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllShoes: builder.query({
      query: ({
        searchTerm,
        material,
        style,
        size,
        color,
        minPrice,
        maxPrice,
      }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (material) params.append("material", material);
        if (style) params.append("style", style);
        if (size) params.append("size", size);
        if (color) params.append("color", color);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);

        return {
          url: `/shoes/getAllShoes?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["allShoes"],
    }),
    addShoe: builder.mutation({
      query: (data) => ({
        url: "/shoes/addNewPair",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allShoes"],
    }),
    singleDelete: builder.mutation({
      query: (id) => ({
        url: `/shoes/deleteShoe/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allShoes"],
    }),
    bulkDelete: builder.mutation({
      query: (data) => ({
        url: "/shoes/bulkDeleteShoe",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["allShoes"],
    }),
    updateShoe: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shoes/updateDetails/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["allShoes"],
    }),
    updatePolisStatus: builder.mutation({
      query: (data) => {
        console.log("inside api", data);
        return {
          url: `/shoe-polish/updateShoePolishRequest/${data._id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["shoePolishRequest"],
    }),
  }),
});

export const {
  useGetAllShoesQuery,
  useAddShoeMutation,
  useSingleDeleteMutation,
  useBulkDeleteMutation,
  useUpdateShoeMutation,
  useUpdatePolisStatusMutation,
} = shoeApi;
