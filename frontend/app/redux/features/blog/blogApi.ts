import { baseApi } from "@/redux/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: () => ({
        url: "/blog/all",
      }),
      providesTags: ["blog"],
    }),

    getBlogById: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
      }),
      providesTags: ["blog"],
    }),

    getBlogBySlug: builder.query({
      query: (slug) => ({
        url: `/blog/slug/${slug}`,
      }),
      providesTags: ["blog"],
    }),

    addBlog: builder.mutation({
      query: (formData) => ({
        url: `/blog/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/blog/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useGetBlogByIdQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogBySlugQuery,
} = blogApi;
