import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../../../components/Pagination";
import Search from "../../../components/Search";
import Table from "../../../components/Table/Table";
import TablePagination from "../../../components/Table/TablePagination";
import Title from "../../../components/Title";
import { useDeleteBrandMutation, useGetBrandsQuery } from "../../../features/apis/brandsApi";
import { Brand } from "../../../types/Brand";
import { Paginate } from "../../../types/Pagination";
const Brands = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();
  const paginate = 8;

  const headers = [
    { name: t("id"), key: "id", sort: true },
    { name: t("name"), key: "name", sort: true },
    { name: t("createdAt"), key: "created_at", sort: true },
  ];

  const [deleteBrand] = useDeleteBrandMutation();
  const {
    data: brands,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetBrandsQuery<UseQueryHookResult<any> & { data: Paginate & { data: Brand[] } }>(
    {
      page,
      search,
      paginate,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  function getRows(): { id: string; created_at: string; name: string }[] {
    if (isSuccess) {
      return brands.data.map((brand) => {
        return {
          id: String(brand.id),
          name: brand.name,
          created_at: new Date(brand.created_at).toLocaleString(),
        };
      });
    }

    return [];
  }

  async function handleDelete(id: string) {
    await deleteBrand(Number(id));
    await refetch();
  }

  return (
    <div className="flex flex-col gap-4">
      <Title title={String(t("brands"))} />
      <Search setSearch={setSearch} />

      <div className="bg-white dark:bg-dark-gray rounded-md">
        <Table isLoading={isFetching || isLoading} headers={headers} rows={getRows()} displayEdit={true} handleDelete={handleDelete} />
        {isSuccess && <TablePagination page={page} setPage={setPage} lastPage={brands.last_page} />}
      </div>
    </div>
  );
};

export default Brands;
