import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import GlobalError from "../../../components/GlobalError";
import Loader from "../../../components/Loaders/Loader";
import ProductsTable from "../../../components/Table/ProductsTable";
import ProductsTableWithQuantityinput from "../../../components/Table/ProductsTableWithQuantityinput";
import Title from "../../../components/Title";
import { useShowSaleQuery, useUpdateSaleMutation } from "../../../features/apis/salesApi";
import { Product } from "../../../types/Product";

const EditSale = () => {
  const { id } = useParams();
  const { data: sale, isSuccess: isSaleLoaded, isFetching: isSaleFetching } = useShowSaleQuery(Number(id), { refetchOnMountOrArgChange: true });
  const [updateSale, { isLoading: isUpdatingSaleLoading }] = useUpdateSaleMutation();
  const [products, setProducts] = useState<(Product & { quantity: number })[]>([]);
  const [globalMessage, setGlobalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSaleLoaded && !isSaleFetching) {
      setProducts(sale.products.map((product) => ({ ...product, quantity: 1 })));
    }
  }, [isSaleLoaded, isSaleFetching]);

  function handleAdd(data: any) {
    const product = { ...data, quantity: 1 };
    let products_copy = [...products];

    let found = false;

    for (let i = 0; i < products_copy.length; i++) {
      if (products_copy[i].id === product.id) {
        products_copy[i].quantity += 1;
        found = true;
        break;
      }
    }

    if (!found) products_copy.push(product);

    setProducts(products_copy);
  }

  async function handleClick() {
    if (isSaleLoaded) {
      let productsChanged = false;

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        let changed = false;

        for (let j = 0; j < sale.products.length; j++) {
          const saleProduct = sale.products[j];

          if (product.id === saleProduct.id && product.quantity === saleProduct.pivot.quantity) {
            changed = true;
            break;
          }
        }

        if (!changed) {
          productsChanged = true;
          break;
        }
      }

      if (productsChanged) {
        const sale = {
          products: products.map((product) => ({ id: product.id, quantity: product.quantity, total_price: product.price * product.quantity })),
        };

        await updateSale({ id: Number(id), sale });

        navigate("/sales");
      } else {
        setGlobalMessage("Update Something first");
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Title title="Edit Sale" />
      {isSaleLoaded && (
        <>
          <GlobalError global_message={globalMessage} />
          <ProductsTable handleAdd={handleAdd} />
          <ProductsTableWithQuantityinput setProducts={setProducts} products={products} />
          <Button handleClick={handleClick} content={isUpdatingSaleLoading ? <Loader /> : "Update Sale"} />
        </>
      )}
    </div>
  );
};

export default EditSale;
