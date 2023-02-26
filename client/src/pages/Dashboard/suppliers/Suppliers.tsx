import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import Table from "../../../components/Table/Table";
import Title from "../../../components/Title";
import {
  useDeleteSupplierMutation,
  useGetSuppliersQuery,
} from "../../../features/apis/suppliersApi";
import { Paginate } from "../../../types/Pagination";
import { Supplier } from "../../../types/Supplier";
import { Headers } from "../../../types/Table";

const Suppliers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const paginate = 8;

  const [deleteSupplier] = useDeleteSupplierMutation();
  const {
    data: suppliers,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
  } = useGetSuppliersQuery<
    UseQueryHookResult<any> & { data: Paginate & { data: Supplier[] } }
  >({
    paginate,
    page,
    search,
  });

  const headers: Headers = [
    { name: "id", sort: true },
    { name: "name", sort: true },
    { name: "email", sort: true },
    { name: "vat", sort: true },
    { name: "phone", sort: true },
    { name: "created At", sort: true },
  ];

  function getRows(): {
    id: number;
    created_at: string;
    name: string;
    email: string;
    vat: string;
    phone: string;
  }[] {
    if (isSuccess) {
      return suppliers.data.map((supplier) => {
        return {
          id: supplier.id,
          name: supplier.name,
          email: supplier.email,
          vat: supplier.vat,
          phone: supplier.phone,
          created_at: new Date(supplier.created_at).toLocaleString(),
        };
      });
    }

    return [];
  }

  async function handleDelete(id: string) {
    await deleteSupplier(Number(id));
    await refetch();
  }

  return (
    <div>
      <Title title="Suppliers" />
      <Table
        headers={headers}
        rows={getRows()}
        is_loading={isLoading || isFetching}
        page_count={suppliers?.last_page ?? null}
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

export default Suppliers;
