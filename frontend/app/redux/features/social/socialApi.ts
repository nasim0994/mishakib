import { baseApi } from "@/redux/baseApi";

export const socialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSocial: builder.query({
      query: () => ({
        url: "/social/all",
      }),
      providesTags: ["social"],
    }),

    getSocialById: builder.query({
      query: (id) => ({
        url: `/social/${id}`,
      }),
      providesTags: ["social"],
    }),

    addSocial: builder.mutation({
      query: (data) => ({
        url: `/social/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["social"],
    }),

    updateSocial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/social/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["social"],
    }),

    deleteSocial: builder.mutation({
      query: (id) => ({
        url: `/social/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["social"],
    }),
  }),
});

export const {
  useGetAllSocialQuery,
  useAddSocialMutation,
  useUpdateSocialMutation,
  useDeleteSocialMutation,
  useGetSocialByIdQuery,
} = socialApi;
