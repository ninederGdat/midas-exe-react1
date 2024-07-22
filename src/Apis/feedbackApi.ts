import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exemidas2-api.azurewebsites.net/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),

  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query({
      query: () => ({
        url: "Feedback",
      }),
      providesTags: ["Feedback"],
    }),
    getFeedbackByStoreId: builder.query({
      query: (id) => ({
        url: `Feedback/${id}`,
      }),
      providesTags: ["Feedback"],
    }),
    createFeeback: builder.mutation({
      query: (data) => ({
        url: "Feedback",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),

    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: "Feedback/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const {
  useGetAllFeedbacksQuery,
  useGetFeedbackByStoreIdQuery,
  useDeleteFeedbackMutation,
  useCreateFeebackMutation,
} = feedbackApi;

export default feedbackApi;
