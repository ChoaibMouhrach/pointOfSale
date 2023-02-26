import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import Table from "../../../components/Table/Table";
import Title from "../../../components/Title";
import {
  useDeleteSaleMutation,
  useGetSalesQuery,
} from "../../../features/apis/salesApi";
import { Paginate } from "../../../types/Pagination";
import { SaleProducts } from "../../../types/Sale";
import { Headers } from "../../../types/Table";

const Sales = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const paginate = 8;

  const [deleteSale] = useDeleteSaleMutation();
  const {
    data: sales,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetSalesQuery<
    UseQueryHookResult<any> & { data: Paginate & { data: SaleProducts[] } }
  >({
    page,
    search,
    paginate,
  });

  const headers: Headers = [
    { name: "id", sort: true },
    { name: "total Earnings", sort: true },
    { name: "total Cost", sort: true },
    { name: "number Of Products", sort: true },
    { name: "Created At", sort: true },
  ];

  function getRows() {
    if (isSuccess) {
      return sales.data.map((sale: SaleProducts) => {
        return {
          id: sale.id,
          total_earnings: sale.total_earnings ?? 0,
          total_cost: sale.total_cost ?? 0,
          products_count: sale.products_count,
          created_at: new Date(sale.created_at).toLocaleString(),
        };
      });
    }

    return [];
  }

  async function handleDelete(id: string) {
    await deleteSale(Number(id));
    await refetch();
  }

  return (
    <div>
      <Title title="Sales" />
      <Table
        headers={headers}
        search={search}
        displayEdit={true}
        displayDelete={true}
        handleDelete={handleDelete}
        setSearch={setSearch}
        rows={getRows()}
        is_loading={isLoading || isFetching}
        page_count={sales?.last_page ?? null}
        current_page={page}
        set_page={setPage}
      />
    </div>
  );
};

export default Sales;
