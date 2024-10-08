import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exemidas2-api.azurewebsites.net/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (id) => ({
        url: "Payment/createPayOS/",
        method: "POST",
        params: {
          id: id,
        },
      }),
    }),
    getPaymentInfo: builder.query({
      query: ({ paymentLinkId, accountId }) => ({
        url: `Payment/getinforpayment?paymentLinkId=${paymentLinkId}&accountId=${accountId}`,
      }),
      providesTags: ["Payment"],
    }),
  }),
});

export const { useInitiatePaymentMutation, useGetPaymentInfoQuery } =
  paymentApi;

export default paymentApi;
