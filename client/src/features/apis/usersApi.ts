import api from './api';

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => `/users`,
    }),
    showUser: build.query({
      query: (id: number) => `/users/${id}`,
    }),
    storeUser: build.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/users`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: build.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUser: build.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useShowUserQuery,
  useStoreUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
