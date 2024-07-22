import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exemidas2-api.azurewebsites.net/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),

  tagTypes: ["Store"],
  endpoints: (builder) => ({
    getAllStores: builder.query({
      query: () => ({
        url: "/Store/GetAllStores",
      }),
      providesTags: ["Store"],
    }),
    getStoreByUserId: builder.query({
      query: (id) => ({
        url: `Store/GetByAccountId/${id}`,
      }),
      providesTags: ["Store"],
    }),
    getStoreById: builder.query({
      query: (id) => ({
        url: `Store/GetByStoreId/${id}`,
      }),
      providesTags: ["Store"],
    }),
    createStore: builder.mutation({
      query: (data) => ({
        url: "Store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Store"],
    }),

    // deleteMenuItem: builder.mutation({
    //   query: (id) => ({
    //     url: "user/" + id,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["User"],
    // }),
  }),
});

export const {
  useGetAllStoresQuery,
  useGetStoreByUserIdQuery,
  useGetStoreByIdQuery,
  useCreateStoreMutation,
} = storeApi;

export default storeApi;
