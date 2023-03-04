import React, { useState } from "react";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import InputDropDown from "../../../components/InputDropDown";
import ProductsTable from "../../../components/Table/ProductsTable";
import ProductsTableWithQuantityinput from "../../../components/Table/ProductsTableWithQuantityinput";
import Title from "../../../components/Title";
import { useStorePurchaseMutation } from "../../../features/apis/purchasesApi";
import { useGetSuppliersQuery } from "../../../features/apis/suppliersApi";
import { Product } from "../../../types/Product";
import { Supplier } from "../../../types/Supplier";
import GlobalError from "../../../components/GlobalError";
import Loader from "../../../components/Loaders/Loader";

const CreatePurchase = () => {
  const { data: suppliers, isSuccess } = useGetSuppliersQuery<UseQueryHookResult<any> & { data: Supplier[] }>({});
  const [products, setProducts] = useState<(Product & { quantity: number })[]>([]);
  const [supplier_id, setSupplier_id] = useState<number | null>(null);
  const [createPurchase, { isLoading }] = useStorePurchaseMutation();
  const [dropdownError, setDropdownError] = useState("");
  const navigate = useNavigate();
  const [globalMessage, setGlobalMessage] = useState("");

  async function handleClick() {
    setDropdownError("");
    setGlobalMessage("");
    if (supplier_id) {
      if (!products.length) {
        setGlobalMessage("Select a product first");
        return;
      }

      await createPurchase({
        supplier_id,
        products: products.map((product) => ({ id: product.id, quantity: product.quantity, total_cost: product.cost * product.quantity })),
      });

      navigate("/purchases");

      return;
    }
    setDropdownError("The supplier is required");
  }

  function handleAdd(data: any) {
    const products_copy = [...products];
    let found = false;

    for (let i = 0; i < products_copy.length; i++) {
      if (products_copy[i].id === data.id) {
        products_copy[i].quantity = products_copy[i].quantity + 1;
        found = true;
        break;
      }
    }

    if (!found) {
      products_copy.push({ ...data, quantity: "1" });
    }

    setProducts(products_copy);
  }

  return (
    <div className="flex flex-col gap-4">
      <Title title="Create Purchase" />
      {isSuccess && (
        <>
          <GlobalError global_message={globalMessage} />
          <InputDropDown
            error={dropdownError}
            placeholder="Choose Supplier"
            onChange={(value) => {
              setSupplier_id(Number(value));
            }}
            data={suppliers}
          />
          <ProductsTable handleAdd={handleAdd} />
          <Title title="Products" />
          <ProductsTableWithQuantityinput products={products} setProducts={setProducts} />
          <Button disabled={isLoading} content={isLoading ? <Loader /> : "Create Purchase"} handleClick={handleClick} />
        </>
      )}
    </div>
  );
};

export default CreatePurchase;
