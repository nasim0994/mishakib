import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (query) => ({
        url: "/user/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
