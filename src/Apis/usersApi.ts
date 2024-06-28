import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exemidas-api.azurewebsites.net/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),

  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "user",
      }),
      providesTags: ["User"],
    }),
    getUsersById: builder.query({
      query: (id) => ({
        url: `user/${id}`,
      }),
      providesTags: ["User"],
    }),

    updateInfoUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `user/updateUserInfor/${id}`,
        method: "PUT",

        body: data,
      }),
      invalidatesTags: ["User"],
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
  useGetUsersQuery,
  useGetUsersByIdQuery,
  useUpdateInfoUserMutation,
  // useUpdateMenuItemMutation,
} = userApi;

export default userApi;
