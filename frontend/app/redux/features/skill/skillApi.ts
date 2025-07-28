import { baseApi } from "@/redux/baseApi";

export const skillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkill: builder.query({
      query: () => ({
        url: "/skill",
      }),
      providesTags: ["skill"],
    }),

    addSkill: builder.mutation({
      query: (data) => ({
        url: `/skill/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["skill"],
    }),

    updateSkill: builder.mutation({
      query: ({ id, data }) => ({
        url: `/skill/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["skill"],
    }),
  }),
});

export const { useGetSkillQuery, useAddSkillMutation, useUpdateSkillMutation } =
  skillApi;
