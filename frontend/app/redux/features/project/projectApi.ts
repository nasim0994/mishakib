import { baseApi } from "@/redux/baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProject: builder.query({
      query: (query) => ({
        url: "/project/all",
        params: query,
      }),
      providesTags: ["project"],
    }),

    getAllGallery: builder.query({
      query: (query) => ({
        url: "/project/gallery/all",
        params: query,
      }),
      providesTags: ["project"],
    }),

    getProjectById: builder.query({
      query: (id) => ({
        url: `/project/${id}`,
      }),
      providesTags: ["project"],
    }),

    addProject: builder.mutation({
      query: (data) => ({
        url: `/project/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/project/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetAllProjectQuery,
  useGetAllGalleryQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
} = projectApi;
