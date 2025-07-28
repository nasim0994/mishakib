import { baseApi } from "@/redux/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query({
      query: () => ({
        url: "/contact",
      }),
      providesTags: ["contact"],
    }),

    addContact: builder.mutation({
      query: (data) => ({
        url: `/contact/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),

    updateContact: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contact/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const { useGetContactQuery, useAddContactMutation, useUpdateContactMutation } =
  contactApi;
