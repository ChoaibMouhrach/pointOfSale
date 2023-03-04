import React, { useState } from "react";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import Table from "../../../components/Table/Table";
import Title from "../../../components/Title";
import { useDeleteUserMutation, useGetUsersQuery } from "../../../features/apis/usersApi";
import { Paginate } from "../../../types/Pagination";
import { User } from "../../../types/User";
import Search from "../../../components/Search";
import TablePagination from "../../../components/Table/TablePagination";

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
  } = useGetUsersQuery<UseQueryHookResult<any> & { data: Paginate & { data: User[] } }>({
    page,
    paginate,
    search,
  });

  const headers = [
    { key: "id", name: "id", sort: true },
    { key: "name", name: "name", sort: true },
    { key: "email", name: "email", sort: true },
    { key: "created_at", name: "created At", sort: true },
  ];

  function getRows(): {
    id: string;
    created_at: string;
    name: string;
    email: string;
  }[] {
    if (isSuccess) {
      return users.data.map((user) => {
        return {
          id: String(user.id),
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
    <div className="flex flex-col gap-4">
      <Title title="Users" />
      <Search setSearch={setSearch} />

      <div className="bg-white dark:bg-dark-gray rounded-md">
        <Table isLoading={isLoading || isFetching} headers={headers} rows={getRows()} handleDelete={handleDelete} displayEdit={true} />
        {isSuccess && <TablePagination page={page} setPage={setPage} lastPage={users.last_page} />}
      </div>
    </div>
  );
};

export default Users;
