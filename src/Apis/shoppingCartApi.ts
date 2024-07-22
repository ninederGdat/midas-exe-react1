import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exemidas2-api.azurewebsites.net/api/",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (accountId) => ({
        url: `cart/${accountId}`,
      }),
      providesTags: ["Cart"],
    }),

    updateShoppingCart: builder.mutation({
      query: ({ productid, quantity, accountId }) => ({
        url: "cart",
        method: "POST",
        // params: {
        //   productid,
        //   quantity,
        //   accountId,
        // },
        body: { productid, quantity, accountId },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: "cart/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetShoppingCartQuery,
  useUpdateShoppingCartMutation,
  useRemoveProductMutation,
} = shoppingCartApi;

export default shoppingCartApi;
