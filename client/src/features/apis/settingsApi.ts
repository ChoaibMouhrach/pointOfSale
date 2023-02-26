import api from "./api";

const settingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query({
      query: () => "/settings",
    }),
    updateSettings: build.mutation({
      query: (data: any) => ({
        url: "/settings",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
