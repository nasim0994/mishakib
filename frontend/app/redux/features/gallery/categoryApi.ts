import { baseApi } from "@/redux/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/gallery/category/all",
      }),
      providesTags: ["category"],
    }),

    getCategoryById: builder.query({
      query: (id) => ({
        url: `/gallery/category/${id}`,
      }),
      providesTags: ["category"],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: `/gallery/category/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/gallery/category/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/gallery/category/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
} = categoryApi;
