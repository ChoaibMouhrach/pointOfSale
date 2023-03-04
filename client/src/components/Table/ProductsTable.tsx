import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/apis/productsApi";
import { Paginate } from "../../types/Pagination";
import { Product } from "../../types/Product";
import Search from "../Search";
import Table from "./Table";
import TablePagination from "./TablePagination";

type ProductsTableProps = {
  handleAdd?: (data: any) => void;
};

const ProductsTable = ({ handleAdd }: ProductsTableProps) => {
  // setup
  const [searchParams] = useSearchParams();

  // table constants
  const [page, setPage] = useState<number>(searchParams.get("page") ? Number(searchParams.get("page")) : 1);
  const [search, setSearch] = useState<string>(searchParams.get("search") ?? "");

  // constants
  const paginate = 8;
  const headers = [
    { name: "id", key: "id", sort: true },
    { name: "name", key: "name", sort: true },
    { name: "price", key: "price", sort: true },
    { name: "cost", key: "cost", sort: true },
    { name: "stock", key: "stock", sort: true },
    { name: "Created at", key: "created_at", sort: true },
  ];

  const { data, isLoading, isSuccess, isFetching, refetch } = useGetProductsQuery<UseQueryHookResult<any> & { data: Paginate & { data: Product[] } }>({
    page,
    paginate,
    search,
  });

  // fetch rows
  function getRows(): {
    id: string;
    name: string;
    price: number;
    cost: number;
    stock: number;
    created_at: string;
  }[] {
    if (isSuccess) {
      const products: Product[] = data.data;

      return products.map((product: Product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        cost: product.cost,
        stock: product.stock,
        created_at: new Date(product.created_at).toLocaleString(),
      }));
    }

    return [];
  }

  return (
    <div className="flex flex-col gap-4">
      <Search setSearch={setSearch} />
      <div className="bg-white dark:bg-dark-gray rounded-md">
        <Table isLoading={isLoading || isFetching} headers={headers} rows={getRows()} handleAdd={handleAdd} />
        {isSuccess && <TablePagination lastPage={data.last_page} page={page} setPage={setPage} />}
      </div>
    </div>
  );
};

export default ProductsTable;
