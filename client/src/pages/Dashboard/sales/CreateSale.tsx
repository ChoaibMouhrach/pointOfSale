import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import GlobalError from "../../../components/GlobalError";
import Loader from "../../../components/Loaders/Loader";
import ProductsTable from "../../../components/Table/ProductsTable";
import ProductsTableWithQuantityinput from "../../../components/Table/ProductsTableWithQuantityinput";
import Title from "../../../components/Title";
import { useStoreSaleMutation } from "../../../features/apis/salesApi";
import { Product } from "../../../types/Product";

const CreateSale = () => {
  const [products, setProducts] = useState<(Product & { quantity: number })[]>([]);
  const [createSale, { isLoading }] = useStoreSaleMutation();
  const [globalMessage, setGlobalMessage] = useState("");
  const navigate = useNavigate();

  async function handleButtonClick() {
    setGlobalMessage("");
    if (products.length) {
      await createSale({
        products: products.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          total_price: product.quantity * product.price,
        })),
      });

      navigate("/sales");
    } else {
      setGlobalMessage("Choose a product first");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Title title="Create Sale" />
      <GlobalError global_message={globalMessage} />
      <ProductsTable
        handleAdd={(data) => {
          const product = { ...data, quantity: 1 } as Product & { quantity: number };
          setProducts([...products, product]);
        }}
      />
      <Title title="Products" />
      <ProductsTableWithQuantityinput products={products} setProducts={setProducts} />
      <Button disabled={isLoading} handleClick={handleButtonClick} content={isLoading ? <Loader /> : "Create Sale"} />
    </div>
  );
};

export default CreateSale;
