import { baseApi } from "@/redux/baseApi";

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGallery: builder.query({
      query: () => ({
        url: "/gallery/all",
      }),
      providesTags: ["gallery"],
    }),

    getGalleryById: builder.query({
      query: (id) => ({
        url: `/gallery/${id}`,
      }),
      providesTags: ["gallery"],
    }),

    addGallery: builder.mutation({
      query: (data) => ({
        url: `/gallery/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["gallery"],
    }),

    updateGallery: builder.mutation({
      query: ({ id, data }) => ({
        url: `/gallery/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["gallery"],
    }),

    deleteGallery: builder.mutation({
      query: (id) => ({
        url: `/gallery/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useGetAllGalleryQuery,
  useAddGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
  useGetGalleryByIdQuery,
} = galleryApi;
