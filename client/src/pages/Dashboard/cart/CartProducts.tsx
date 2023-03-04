import React, { useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import Button from "../../../components/Button";
import GlobalError from "../../../components/GlobalError";
import Input from "../../../components/Input";
import Loader from "../../../components/Loaders/Loader";
import { Product } from "../../../types/Product";
import { useShowProductQuery } from "../../../features/apis/productsApi";
import { debounce } from "../../../helpers/tableHelpers";
import { useTranslation } from "react-i18next";

type CartProductsProps = {
  handlePay: () => void;
  products: (Product & { quantity: number })[];
  setProducts: React.Dispatch<React.SetStateAction<any>>;
  setGlobalMessage: React.Dispatch<React.SetStateAction<any>>;
  globalMessage: string;
  isLoading: boolean;
  getTotal: () => number;
};

const CartProducts = ({ getTotal, handlePay, isLoading, products, setProducts, globalMessage, setGlobalMessage }: CartProductsProps) => {
  const [search, setSearch] = useState<string>("");
  const [skip, setSkip] = useState<boolean>(true);
  const searchInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const {
    data: product,
    isSuccess: isProductLoaded,
    isLoading: isShowProductLoading,
    isError: isProductError,
    isFetching: isProductFetching,
  } = useShowProductQuery(search, { skip });

  function handleChange(id: string, value: string) {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          product.quantity = Number(value);
        }

        return product;
      })
    );
  }

  const updateSearch = debounce((value: string) => {
    setSearch(value);
    setSkip(false);
  }, 300);

  useEffect(() => {
    if (!isProductFetching && isProductLoaded && !isShowProductLoading) {
      handleAdd(product);
      setSkip(true);
      if (searchInput.current) searchInput.current.value = "";
      setGlobalMessage("");
    }

    if (isProductError) {
      setGlobalMessage("Product Not Found");
      if (searchInput.current) {
        searchInput.current.value = "";
      }
    }
  }, [isProductLoaded, isProductFetching, isShowProductLoading, isProductError]);

  function handleAdd(data: any) {
    const product = { ...data, quantity: 1 };
    const products_copy = [...products];

    let found = false;

    for (let i = 0; i < products_copy.length; i++) {
      if (product.id === products_copy[i].id) {
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

  return (
    <div className="col-start-3 w-full col-end-4 flex flex-col gap-4 overflow-y-scroll scrollbar pr-1">
      <div className="dark:bg-dark-gray bg-white border-white p-3 rounded-md flex justify-between border dark:border-dark-gray">
        <span className="font-semibold">{t("total")}</span>
        <span>$ {getTotal()}</span>
      </div>
      <Input
        rf={searchInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSearch(e.target.value)}
        placeholder={t("product") + " " + t("code")}
      />
      <table className="w-full bg-white dark:bg-dark-gray rounded-md">
        <thead>
          <tr className="text-white">
            <th className="rounded-l-md bg-primary p-3 tracking-wide text-start">
              <button className="cursor-default">{t("name")}</button>
            </th>
            <th className=" bg-primary p-3 tracking-wide text-center">
              <button className="cursor-default">{t("quantity")}</button>
            </th>
            <th className="rounded-r-md bg-primary p-3 tracking-wide text-end">
              <button className="cursor-default">{t("options")}</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="p-3 tracking-wide">{product.name.substring(0, 100)}...</td>
              <td className="p-3 tracking-wide text-end flex justify-center">
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(product.id, e.target.value)}
                  value={product.quantity}
                  className="bg-gray-300 dark:bg-dark p-2 outline-none rounded-md max-auto text-center w-36"
                  type="number"
                />
              </td>
              <td className="p-3 tracking-wide text-end">
                <button onClick={() => setProducts(products.filter((p) => p.id !== product.id))} className="bg-danger text-white p-1 rounded-md text-2xl">
                  <MdAdd className="rotate-45" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <GlobalError global_message={globalMessage} />
      <div>
        <Button handleClick={handlePay} variation="success" content={isLoading ? <Loader /> : t("pay")} />
      </div>
    </div>
  );
};

export default CartProducts;
