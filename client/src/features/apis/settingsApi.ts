import { Settings, UpdateSettings } from "../../types/Settings";
import api from "./api";

const settingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<Settings, void>({
      query: () => "/settings",
    }),
    updateSettings: build.mutation<Settings, UpdateSettings>({
      query: (settings: UpdateSettings) => ({
        url: "/settings",
        method: "PATCH",
        body: settings,
      }),
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
