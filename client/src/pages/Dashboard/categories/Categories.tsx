import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Search from "../../../components/Search";
import Table from "../../../components/Table/Table";
import TablePagination from "../../../components/Table/TablePagination";
import Title from "../../../components/Title";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../../features/apis/categoriesApi";
import { Category } from "../../../types/Category";
import { Paginate } from "../../../types/Pagination";

const Categories = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const paginate = 8;
  const { t } = useTranslation();

  const [deleteCategory] = useDeleteCategoryMutation();
  const {
    data: categories,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetCategoriesQuery<UseQueryHookResult<any> & { data: Paginate & { data: Category[] } }>(
    {
      page,
      search,
      paginate,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const headers = [
    { name: t("id"), key: "id", sort: true },
    { name: t("name"), key: "name", sort: true },
    { name: t("createdAt"), key: "created_at", sort: true },
  ];

  function getRows(): { id: string; created_at: string; name: string }[] {
    if (isSuccess) {
      return categories.data.map((category) => {
        return {
          id: String(category.id),
          name: category.name,
          created_at: new Date(category.created_at).toLocaleString(),
        };
      });
    }

    return [];
  }

  async function handleDelete(id: string) {
    await deleteCategory(Number(id));
    await refetch();
  }

  return (
    <div className="flex flex-col gap-4">
      <Title title={String(t("categories"))} />
      <Search setSearch={setSearch} />

      <div className="bg-white dark:bg-dark-gray rounded-md">
        <Table isLoading={isLoading || isFetching} headers={headers} rows={getRows()} displayEdit={true} handleDelete={handleDelete} />
        {isSuccess && <TablePagination lastPage={categories.last_page} page={page} setPage={setPage} />}
      </div>
    </div>
  );
};

export default Categories;
