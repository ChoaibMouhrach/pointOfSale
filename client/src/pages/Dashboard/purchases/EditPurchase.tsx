import React, { useEffect, useState } from "react";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../../components/Title";
import { useShowPurchaseQuery, useUpdatePurchaseMutation } from "../../../features/apis/purchasesApi";
import { useGetSuppliersQuery } from "../../../features/apis/suppliersApi";
import { Supplier } from "../../../types/Supplier";
import ProductsTable from "../../../components/Table/ProductsTable";
import { Product } from "../../../types/Product";
import ProductsTableWithQuantityinput from "../../../components/Table/ProductsTableWithQuantityinput";
import InputDropDown from "../../../components/InputDropDown";
import Button from "../../../components/Button";
import { UpdatePurchase } from "../../../types/Purchases";
import Loader from "../../../components/Loaders/Loader";
import GlobalError from "../../../components/GlobalError";

type ProductQuantity = Product & {
  quantity: number;
};

const EditPurchase = () => {
  const { id } = useParams();
  const { data: purchase, isSuccess: isPurchaseLoaded, isFetching: isPurchaseFetching } = useShowPurchaseQuery(Number(id), { refetchOnMountOrArgChange: true });
  const { data: suppliers, isSuccess: isSuppliersLoaded } = useGetSuppliersQuery<UseQueryHookResult<any> & { data: Supplier[] }>({});
  const [updatePurchase, { isLoading: isUpdatingPurchaseLoading }] = useUpdatePurchaseMutation();
  const [products, setProducts] = useState<(Product & { quantity: number })[]>([]);
  const [supplierId, setSupplierId] = useState<number | null>(null);
  const [globalMessage, setGlobalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isPurchaseLoaded && isSuppliersLoaded && !isPurchaseFetching) {
      setProducts(purchase.products.map((product) => ({ ...product, quantity: product.pivot.quantity })));
      setSupplierId(purchase.supplier_id);
    }
  }, [isSuppliersLoaded, isPurchaseLoaded, isPurchaseFetching]);

  function handleAdd(data: any) {
    const product = { ...data, quantity: 1 } as Product & { quantity: number };
    const products_copy = [...products];
    let found = false;

    for (let i = 0; i < products_copy.length; i++) {
      if (products_copy[i].id === product.id) {
        products_copy[i].quantity += 1;
        found = true;
        break;
      }
    }

    if (!found) {
      products_copy.push(product);
    }

    setProducts(products_copy);
  }

  async function handleClick() {
    if (isPurchaseLoaded && supplierId) {
      setGlobalMessage("");

      let supplier_changed = false;

      if (supplierId != purchase.supplier_id) {
        supplier_changed = true;
      }

      let productsChanged = false;

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        let changed = false;

        for (let j = 0; j < purchase.products.length; j++) {
          const purchaseProduct = purchase.products[j];

          if (product.id === purchaseProduct.id && product.quantity === purchaseProduct.pivot.quantity) {
            changed = true;
            break;
          }
        }

        if (!changed) {
          productsChanged = true;
          break;
        }
      }

      if (supplier_changed || productsChanged) {
        const purchase: UpdatePurchase = {};

        if (supplier_changed) {
          purchase["supplier_id"] = supplierId;
        }

        if (productsChanged) {
          purchase["products"] = products.map((product) => ({ id: product.id, quantity: product.quantity, total_cost: product.quantity * product.cost }));
        }

        await updatePurchase({ id: Number(id), purchase });

        navigate("/purchases");
      } else {
        setGlobalMessage("Try Updating something first");
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Title title="Edit Purchase" />
      {isPurchaseLoaded && isSuppliersLoaded && !isPurchaseFetching && supplierId && (
        <>
          <GlobalError global_message={globalMessage} />
          <InputDropDown
            data={suppliers}
            onChange={(value) => {
              setSupplierId(Number(value));
            }}
            defaultValue={supplierId}
            placeholder="Choose supplier"
          />
          <ProductsTable handleAdd={handleAdd} />
          <ProductsTableWithQuantityinput products={products} setProducts={setProducts} />
          <Button disabled={isUpdatingPurchaseLoading} content={isUpdatingPurchaseLoading ? <Loader /> : "Update Purchase"} handleClick={handleClick} />
        </>
      )}
    </div>
  );
};

export default EditPurchase;
