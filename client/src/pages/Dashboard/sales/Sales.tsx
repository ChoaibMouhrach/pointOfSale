import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import Search from "../../../components/Search";
import Table from "../../../components/Table/Table";
import TablePagination from "../../../components/Table/TablePagination";
import Title from "../../../components/Title";
import { useDeleteSaleMutation, useGetSalesQuery } from "../../../features/apis/salesApi";
import { Paginate } from "../../../types/Pagination";
import { SaleProducts } from "../../../types/Sale";

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
  } = useGetSalesQuery<UseQueryHookResult<any> & { data: Paginate & { data: SaleProducts[] } }>(
    {
      page,
      search,
      paginate,
    },
    { refetchOnMountOrArgChange: true }
  );

  const headers = [
    { key: "id", name: "id", sort: true },
    { key: "total_earnings", name: "total Earnings", sort: true },
    { key: "total_cost", name: "total Cost", sort: true },
    { key: "products_count", name: "number Of Products", sort: true },
    { key: "created_at", name: "Created At", sort: true },
  ];

  function getRows(): { id: string; total_earnings: number; total_cost: number; products_count: number; created_at: string }[] {
    if (isSuccess) {
      return sales.data.map((sale: SaleProducts) => {
        return {
          id: String(sale.id),
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
    <div className="flex flex-col gap-4">
      <Title title="Sales" />
      <Search setSearch={setSearch} />

      <div className="bg-white dark:bg-dark-gray rounded-md">
        <Table isLoading={isLoading || isFetching} headers={headers} rows={getRows()} displayEdit={true} handleDelete={handleDelete} />
        {isSuccess && <TablePagination page={page} setPage={setPage} lastPage={sales.last_page} />}
      </div>
    </div>
  );
};

export default Sales;
