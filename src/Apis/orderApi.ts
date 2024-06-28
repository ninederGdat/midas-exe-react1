import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderDetails } from "../Pages";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exemidas-api.azurewebsites.net/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "/order/api/create",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Order"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "order",
      }),
      providesTags: ["Order"],
    }),
    getAllOrdersById: builder.query({
      query: (orderId) => ({
        url: "order/" + orderId,
        params: {
          orderId: orderId,
        },
      }),
      providesTags: ["Order"],
    }),
    getAllOrdersByUser: builder.query({
      query: (UserID) => ({
        url: "order/by-account/" + UserID,
        params: {
          UserID: UserID,
        },
      }),
      providesTags: ["Order"],
    }),
    // getOrderDetails: builder.query({
    //   query: (id) => ({
    //     url: `order/${id}`,
    //   }),
    //   providesTags: ["Order"],
    // }),
    updateOrderHeader: builder.mutation({
      query: ({ data, orderId }) => ({
        url: "order/" + orderId,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  // useGetOrderDetailsQuery,
  useUpdateOrderHeaderMutation,
  useGetAllOrdersByIdQuery,
  useGetAllOrdersByUserQuery,
} = orderApi;

export default orderApi;
