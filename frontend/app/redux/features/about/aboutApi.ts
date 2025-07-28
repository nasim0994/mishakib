import { baseApi } from "@/redux/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: "/about",
      }),
      providesTags: ["about"],
    }),

    addAbout: builder.mutation({
      query: (data) => ({
        url: `/about/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),

    updateAbout: builder.mutation({
      query: ({ id, data }) => ({
        url: `/about/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),
  }),
});

export const { useGetAboutQuery, useAddAboutMutation, useUpdateAboutMutation } =
  blogApi;
