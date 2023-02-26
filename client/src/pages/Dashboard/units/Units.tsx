import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import Table from "../../../components/Table/Table";
import Title from "../../../components/Title";
import {
  useDeleteUnitMutation,
  useGetUnitsQuery,
} from "../../../features/apis/unitsApi";
import { Paginate } from "../../../types/Pagination";
import { Headers } from "../../../types/Table";
import { Unit } from "../../../types/Unit";

const Units = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const paginate = 8;

  const [deleteUnit] = useDeleteUnitMutation();
  const {
    data: units,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
  } = useGetUnitsQuery<
    UseQueryHookResult<any> & { data: Paginate & { data: Unit[] } }
  >({
    page,
    search,
    paginate,
  });

  const headers: Headers = [
    { name: "id", sort: true },
    { name: "name", sort: true },
    { name: "short Name", sort: true },
    { name: "created At", sort: true },
  ];

  function getRows(): {
    id: number;
    shortname: string;
    created_at: string;
    name: string;
  }[] {
    if (isSuccess) {
      return units.data.map((unit) => {
        return {
          id: unit.id,
          name: unit.name,
          shortname: unit.shortname,
          created_at: new Date(unit.created_at).toLocaleString(),
        };
      });
    }

    return [];
  }

  async function handleDelete(id: string) {
    await deleteUnit(Number(id));
    await refetch();
  }

  return (
    <div>
      <Title title="Units" />
      <Table
        headers={headers}
        rows={getRows()}
        is_loading={isLoading || isFetching}
        page_count={units?.last_page ?? null}
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

export default Units;
