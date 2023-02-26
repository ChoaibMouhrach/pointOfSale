import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import Table from "../../../components/Table/Table";
import Title from "../../../components/Title";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "../../../features/apis/brandsApi";
import { Brand } from "../../../types/Brand";
import { Paginate } from "../../../types/Pagination";
import { Headers } from "../../../types/Table";

const Brands = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const paginate = 8;

  const headers: Headers = [
    { name: "id", sort: true },
    { name: "name", sort: true },
    { name: "created At", sort: true },
  ];

  const [deleteBrand] = useDeleteBrandMutation();
  const {
    data: brands,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetBrandsQuery<
    UseQueryHookResult<any> & { data: Paginate & { data: Brand[] } }
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

  function getRows(): { id: number; created_at: string; name: string }[] {
    if (isSuccess) {
      return brands.data.map((brand) => {
        return {
          id: brand.id,
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
    <div>
      <Title title="Brands" />
      <Table
        headers={headers}
        rows={getRows()}
        is_loading={isLoading || isFetching}
        page_count={brands?.last_page ?? null}
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

export default Brands;
