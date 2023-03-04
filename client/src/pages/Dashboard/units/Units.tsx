import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Search from "../../../components/Search";
import Table from "../../../components/Table/Table";
import TablePagination from "../../../components/Table/TablePagination";
import Title from "../../../components/Title";
import { useDeleteUnitMutation, useGetUnitsQuery } from "../../../features/apis/unitsApi";
import { Paginate } from "../../../types/Pagination";
import { Unit } from "../../../types/Unit";

const Units = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const paginate = 8;
  const { t } = useTranslation();

  const [deleteUnit] = useDeleteUnitMutation();
  const {
    data: units,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
  } = useGetUnitsQuery<UseQueryHookResult<any> & { data: Paginate & { data: Unit[] } }>({
    page,
    search,
    paginate,
  });

  const headers = [
    { key: "id", name: String(t("id")), sort: true },
    { key: "name", name: String(t("name")), sort: true },
    { key: "shortname", name: String(t("shortname")), sort: true },
    { key: "createdAt", name: String(t("createdAt")), sort: true },
  ];

  function getRows(): {
    id: string;
    shortname: string;
    created_at: string;
    name: string;
  }[] {
    if (isSuccess) {
      return units.data.map((unit) => {
        return {
          id: String(unit.id),
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
    <div className="flex flex-col gap-4">
      <Title title={String(t("units"))} />
      <Search setSearch={setSearch} />
      <div className="bg-white dark:bg-dark-gray rounded-md">
        <Table isLoading={isLoading || isFetching} headers={headers} rows={getRows()} handleDelete={handleDelete} displayEdit={true} />
        {isSuccess && <TablePagination setPage={setPage} page={page} lastPage={units.last_page} />}
      </div>
    </div>
  );
};

export default Units;
