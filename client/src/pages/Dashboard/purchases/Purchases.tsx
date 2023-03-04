import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "../../../components/Search";
import Table from "../../../components/Table/Table";
import TablePagination from "../../../components/Table/TablePagination";
import Title from "../../../components/Title";
import { useDeletePurchaseMutation, useGetPurchasesQuery } from "../../../features/apis/purchasesApi";
import { Paginate } from "../../../types/Pagination";
import { Purchase } from "../../../types/Purchases";

const Purchases = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(searchParams.get("page") ? Number(searchParams.get("page")) : 1);
  const [search, setSearch] = useState<string>(searchParams.get("search") ?? "");
  const paginate = 8;

  const [deletePurchase] = useDeletePurchaseMutation();
  const {
    data: purchases,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetPurchasesQuery<UseQueryHookResult<any> & { data: Paginate & { data: Purchase[] } }>(
    {
      paginate,
      page,
      search,
    },
    { refetchOnMountOrArgChange: true }
  );

  const headers = [
    { key: "id", name: "id", sort: true },
    { key: "supplier_id", name: "supplier Id", sort: true },
    { key: "total_cost", name: "total Cost", sort: true },
    { key: "products_count", name: "Number of Products", sort: true },
    { key: "created_at", name: "created At", sort: true },
  ];

  function getRows(): {
    id: string;
    supplier_id: number;
    total_cost: number;
    created_at: string;
  }[] {
    if (isSuccess) {
      return purchases.data.map((purchase: Purchase) => {
        return {
          id: String(purchase.id),
          supplier_id: purchase.supplier_id,
          total_cost: purchase.total_cost ?? 0,
          products_count: purchase.products_count,
          created_at: new Date(purchase.created_at).toLocaleString(),
        };
      });
    }

    return [];
  }

  async function handleDelete(id: string) {
    await deletePurchase(Number(id));
    await refetch();
  }

  return (
    <div className="flex flex-col gap-4">
      <Title title="Purchases" />
      <Search setSearch={setSearch} />

      <div className="bg-white dark:bg-dark-gray rounded-md">
        <Table isLoading={isLoading || isFetching} headers={headers} handleDelete={handleDelete} rows={getRows()} displayEdit={true} />
        {isSuccess && <TablePagination page={page} setPage={setPage} lastPage={purchases.last_page} />}
      </div>
    </div>
  );
};

export default Purchases;
