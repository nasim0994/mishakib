import { baseApi } from "@/redux/baseApi";

export const logoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLogo: builder.query({
      query: () => ({
        url: "/logo-favicon",
      }),
      providesTags: ["logo"],
    }),

    addLogo: builder.mutation({
      query: (data) => ({
        url: `/logo-favicon/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["logo"],
    }),

    updateLogo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/logo-favicon/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["logo"],
    }),
  }),
});

export const { useGetLogoQuery, useAddLogoMutation, useUpdateLogoMutation } =
  logoApi;
