import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import Search from "../../../components/Search";
import Table from "../../../components/Table/Table";
import TablePagination from "../../../components/Table/TablePagination";
import Title from "../../../components/Title";
import { useDeleteSupplierMutation, useGetSuppliersQuery } from "../../../features/apis/suppliersApi";
import { Paginate } from "../../../types/Pagination";
import { Supplier } from "../../../types/Supplier";

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
  } = useGetSuppliersQuery<UseQueryHookResult<any> & { data: Paginate & { data: Supplier[] } }>({
    paginate,
    page,
    search,
  });

  const headers = [
    { key: "id", name: "id", sort: true },
    { key: "name", name: "name", sort: true },
    { key: "email", name: "email", sort: true },
    { key: "vat", name: "vat", sort: true },
    { key: "phone", name: "phone", sort: true },
    { key: "created_at", name: "created At", sort: true },
  ];

  function getRows(): {
    id: string;
    created_at: string;
    name: string;
    email: string;
    vat: string;
    phone: string;
  }[] {
    if (isSuccess) {
      return suppliers.data.map((supplier) => {
        return {
          id: String(supplier.id),
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
    <div className="flex flex-col gap-4">
      <Title title="Suppliers" />
      <Search setSearch={setSearch} />
      <div className="bg-white dark:bg-dark-gray rounded-md">
        <Table isLoading={isLoading || isFetching} headers={headers} rows={getRows()} handleDelete={handleDelete} displayEdit={true} />
        {isSuccess && <TablePagination setPage={setPage} page={page} lastPage={suppliers.last_page} />}
      </div>
    </div>
  );
};

export default Suppliers;
