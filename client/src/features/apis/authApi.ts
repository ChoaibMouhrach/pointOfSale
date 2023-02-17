import api from './api';

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    authenticate: build.mutation({
      query: () => ({
        url: '/auth',
        method: 'POST',
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: '/auth',
        method: 'POST',
      }),
    }),
  }),
});

export const { useAuthenticateMutation, useLogoutMutation } = authApi;
