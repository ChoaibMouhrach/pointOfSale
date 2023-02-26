import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import Table from "../../../components/Table/Table";
import Title from "../../../components/Title";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../../features/apis/usersApi";
import { Paginate } from "../../../types/Pagination";
import { Headers } from "../../../types/Table";
import { User } from "../../../types/User";

const Users = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const paginate = 8;

  const [deleteUser] = useDeleteUserMutation();
  const {
    data: users,
    isLoading,
    isFetching,
    refetch,
    isSuccess,
  } = useGetUsersQuery<
    UseQueryHookResult<any> & { data: Paginate & { data: User[] } }
  >({
    page,
    paginate,
    search,
  });

  const headers: Headers = [
    { name: "id", sort: true },
    { name: "name", sort: true },
    { name: "email", sort: true },
    { name: "created At", sort: true },
  ];

  function getRows(): {
    id: number;
    created_at: string;
    name: string;
    email: string;
  }[] {
    if (isSuccess) {
      return users.data.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: new Date(user.created_at).toLocaleString(),
        };
      });
    }

    return [];
  }

  async function handleDelete(id: string) {
    await deleteUser(Number(id));
    await refetch();
  }

  return (
    <div>
      <Title title="Users" />
      <Table
        headers={headers}
        rows={getRows()}
        is_loading={isLoading || isFetching}
        page_count={users?.last_page ?? null}
        current_page={page}
        displayDelete={true}
        displayEdit={true}
        set_page={setPage}
        setSearch={setSearch}
        search={search}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Users;
