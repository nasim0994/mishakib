import { baseApi } from "@/redux/baseApi";

export const seoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSeo: builder.query({
      query: () => ({
        url: "/seo",
      }),
      providesTags: ["seo"],
    }),

    addSeo: builder.mutation({
      query: (data) => ({
        url: `/seo/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["seo"],
    }),

    updateSeo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/seo/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["seo"],
    }),
  }),
});

export const { useGetSeoQuery, useAddSeoMutation, useUpdateSeoMutation } =
  seoApi;
