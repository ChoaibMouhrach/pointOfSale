import React, { useState } from "react";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useSearchParams } from "react-router-dom";
import Table from "../../../components/Table/Table";
import Title from "../../../components/Title";
import { useDeleteProductMutation, useGetProductsQuery } from "../../../features/apis/productsApi";
import { Paginate } from "../../../types/Pagination";
import { Product } from "../../../types/Product";

const Products = () => {
  // setup
  const [searchParams] = useSearchParams();

  // table constants
  const [page, setPage] = useState<number>(searchParams.get("page") ? Number(searchParams.get("page")) : 1);
  const [search, setSearch] = useState<string>(searchParams.get("search") ?? "");

  // constants
  const paginate = 8;
  const headers = [
    { name: "id", sort: true },
    { name: "name", sort: true },
    { name: "price", sort: true },
    { name: "cost", sort: true },
    { name: "stock", sort: true },
    { name: "Created at", sort: true },
  ];

  // api requests
  const [deleteProduct] = useDeleteProductMutation();
  const { data, isLoading, isSuccess, isFetching, refetch } = useGetProductsQuery<UseQueryHookResult<any> & { data: Paginate & { data: Product[] } }>({
    page,
    paginate,
    search,
  });

  // fetch rows
  function getRows(): {
    id: number;
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

  // handle delete row
  async function handleDelete(id: string) {
    const response = await deleteProduct(id);

    if (!("error" in response)) {
      await refetch();
    }
  }

  return (
    <div>
      <Title title="Products" />
      <Table
        handleDelete={handleDelete}
        search={search}
        setSearch={setSearch}
        displayDelete={true}
        displayEdit={true}
        headers={headers}
        rows={getRows()}
        is_loading={isLoading || isFetching}
        page_count={isSuccess && data ? data.last_page : null}
        current_page={page}
        set_page={setPage}
      />
    </div>
  );
};

export default Products;
