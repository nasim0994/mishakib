import { baseApi } from "@/redux/baseApi";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessage: builder.query({
      query: () => ({
        url: "/message/all",
      }),
      providesTags: ["message"],
    }),

    getMessageById: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
      }),
      providesTags: ["message"],
    }),

    addMessage: builder.mutation({
      query: (data) => ({
        url: `/message/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),

    updateMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/message/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/message/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useGetAllMessageQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useGetMessageByIdQuery,
} = messageApi;
