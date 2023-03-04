import { User } from "../../types/User";
import api from "./api";
import { Login, LoginResponse } from "../../types/Auth";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<User, void>({
      query: () => "/profile",
    }),
    authenticate: build.mutation<LoginResponse, Login>({
      query: ({ email, password }: Login) => ({
        url: "/auth",
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useAuthenticateMutation, useLogoutMutation, useGetUserProfileQuery } = authApi;
