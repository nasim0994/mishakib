import { baseApi } from "@/redux/baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: () => ({
        url: "/service/all",
      }),
      providesTags: ["service"],
    }),

    getServiceById: builder.query({
      query: (id) => ({
        url: `/service/${id}`,
      }),
      providesTags: ["service"],
    }),

    addService: builder.mutation({
      query: (data) => ({
        url: `/service/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),

    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/service/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useGetAllServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
} = serviceApi;
