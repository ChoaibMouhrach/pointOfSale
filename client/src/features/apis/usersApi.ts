import { generateUrl } from "../../helpers/apiHelpers";
import { GetParams } from "../../types/Api";
import { Paginate } from "../../types/Pagination";
import { StoreUser, UpdateUser, User } from "../../types/User";
import api from "./api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<(Paginate & { data: User[] }) | User[], GetParams>({
      query: ({ search, paginate, page, relations, fields }: GetParams) =>
        generateUrl({
          baseUrl: "/users",
          search,
          paginate,
          page,
          relations,
          fields,
        }),
    }),
    showUser: build.query<User, number>({
      query: (id: number) => `/users/${id}`,
    }),
    storeUser: build.mutation<User, StoreUser>({
      query: (user: StoreUser) => ({
        url: `/users`,
        method: "POST",
        body: user,
      }),
    }),
    updateUser: build.mutation<User, { id: number; user: UpdateUser }>({
      query: ({ id, user }: { id: number; user: UpdateUser }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: user,
      }),
    }),
    deleteUser: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: "DELETE",
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
