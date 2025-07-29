import { baseApi } from "@/redux/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/project/category/all",
      }),
      providesTags: ["category"],
    }),

    getCategoryById: builder.query({
      query: (id) => ({
        url: `/project/category/${id}`,
      }),
      providesTags: ["category"],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: `/project/category/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/category/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/project/category/delete/${id}`,
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
