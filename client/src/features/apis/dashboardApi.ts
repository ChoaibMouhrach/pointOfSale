import { DashboardData } from "../../types/Dashboard";
import api from "./api";

const dashboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getData: build.query<DashboardData, void>({
      query: () => "/dashboard",
    }),
  }),
});

export const { useGetDataQuery } = dashboardApi;
