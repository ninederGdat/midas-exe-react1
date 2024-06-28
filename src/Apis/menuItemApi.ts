import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exemidas-api.azurewebsites.net/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),

  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: "product",
      }),
      providesTags: ["Product"],
    }),
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `product/getById/${id}`,
      }),
      providesTags: ["Product"],
    }),
    getMenuItemByStoreId: builder.query({
      query: (id) => ({
        url: `product/getProductByStore/${id}`,
      }),
      providesTags: ["Product"],
    }),
    createMenuItem: builder.mutation({
      query: (data) => ({
        url: "product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ data, id }) => ({
        url: "product/update/" + id,
        method: "PUT",

        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: "product/delete/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useCreateMenuItemMutation,
  useDeleteMenuItemMutation,
  useUpdateMenuItemMutation,
  useGetMenuItemByStoreIdQuery,
} = menuItemApi;

export default menuItemApi;
