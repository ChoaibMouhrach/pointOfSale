import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Table from "../../../components/Table/Table";
import Title from "../../../components/Title";
import {
  useDeletePurchaseMutation,
  useGetPurchasesQuery,
} from "../../../features/apis/purchasesApi";
import { Paginate } from "../../../types/Pagination";
import { Purchase } from "../../../types/Purchases";
import { Headers } from "../../../types/Table";

const Purchases = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  );
  const [search, setSearch] = useState<string>(
    searchParams.get("search") ?? ""
  );
  const paginate = 8;

  const [deletePurchase] = useDeletePurchaseMutation();
  const {
    data: purchases,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetPurchasesQuery<
    UseQueryHookResult<any> & { data: Paginate & { data: Purchase[] } }
  >({
    paginate,
    page,
    search,
  });

  const headers: Headers = [
    { name: "id", sort: true },
    { name: "supplier Id", sort: true },
    { name: "total Cost", sort: true },
    { name: "Number of Products", sort: true },
    { name: "created At", sort: true },
  ];

  function getRows(): {
    id: number;
    supplier_id: number;
    total_cost: number;
    created_at: string;
  }[] {
    if (isSuccess) {
      return purchases.data.map((purchase: Purchase) => {
        return {
          id: purchase.id,
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
    <div>
      <Title title="Purchases" />
      <Table
        headers={headers}
        search={search}
        displayEdit={true}
        displayDelete={true}
        handleDelete={handleDelete}
        setSearch={setSearch}
        rows={getRows()}
        is_loading={isLoading || isFetching}
        page_count={isSuccess ? Number(purchases.last_page) : null}
        current_page={page}
        set_page={setPage}
      />
    </div>
  );
};

export default Purchases;
