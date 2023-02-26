import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import Table from "../../../components/Table/Table";
import Title from "../../../components/Title";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../features/apis/categoriesApi";
import { Category } from "../../../types/Category";
import { Headers } from "../../../types/Table";
import { Paginate } from "../../../types/Pagination";

const Categories = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const paginate = 8;

  const [deleteCategory] = useDeleteCategoryMutation();
  const {
    data: categories,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useGetCategoriesQuery<
    UseQueryHookResult<any> & { data: Paginate & { data: Category[] } }
  >(
    {
      page,
      search,
      paginate,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const headers: Headers = [
    { name: "id", sort: true },
    { name: "name", sort: true },
    { name: "created At", sort: true },
  ];

  function getRows(): { id: number; created_at: string; name: string }[] {
    if (isSuccess) {
      return categories.data.map((category) => {
        return {
          id: category.id,
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
    <div>
      <Title title="Categories" />
      <Table
        headers={headers}
        rows={getRows()}
        is_loading={isLoading || isFetching}
        page_count={categories?.last_page ?? null}
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

export default Categories;
