import { baseApi } from "@/redux/baseApi";

export const counterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCounter: builder.query({
      query: () => ({
        url: "/counter/all",
      }),
      providesTags: ["counter"],
    }),

    getCounterById: builder.query({
      query: (id) => ({
        url: `/counter/${id}`,
      }),
      providesTags: ["counter"],
    }),

    addCounter: builder.mutation({
      query: (data) => ({
        url: `/counter/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["counter"],
    }),

    updateCounter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/counter/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["counter"],
    }),

    deleteCounter: builder.mutation({
      query: (id) => ({
        url: `/counter/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["counter"],
    }),
  }),
});

export const {
  useGetAllCounterQuery,
  useAddCounterMutation,
  useUpdateCounterMutation,
  useDeleteCounterMutation,
  useGetCounterByIdQuery,
} = counterApi;
