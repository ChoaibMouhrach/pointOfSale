import { MdAdd } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import ProductsTable from "../../../components/Table/ProductsTable";
import Title from "../../../components/Title";
import { Product } from "../../../types/Product";
import { debounce } from "../../../helpers/tableHelpers";
import { useStoreSaleMutation } from "../../../features/apis/salesApi";
import Loader from "../../../components/Loaders/Loader";
import GlobalError from "../../../components/GlobalError";
import { StoreSale } from "../../../types/Sale";
import { ValidationError } from "../../../types/Validation";
import CartProducts from "./CartProducts";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "react-i18next";

type ProductQuantity = Product & { quantity: number };

const Cart = () => {
  const [products, setProducts] = useState<ProductQuantity[]>([]);
  const [createSale, { isLoading }] = useStoreSaleMutation();
  const [globalMessage, setGlobalMessage] = useState("");
  const [displaymodal, setDisplayModal] = useState<boolean>(false);
  const receipt = useRef(null);
  const { t } = useTranslation();
  const handlePrint = useReactToPrint({
    content: () => receipt.current,
  });

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

  async function handlePay() {
    if (products.length) {
      const sale: StoreSale = {
        products: products.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            total_price: product.price * product.quantity,
          };
        }),
      };

      const response = await createSale(sale);

      if ("error" in response) {
        const errors = response.error as { status: string; data: ValidationError };

        if (errors.data.message) {
          setGlobalMessage(errors.data.message);
        }
      }

      if ("data" in response) {
        setDisplayModal(true);
      }
    } else {
      setGlobalMessage("Add products first");
    }
  }

  function getTotal() {
    let res = 0;

    products.forEach((product) => {
      res += product.price * product.quantity;
    });

    return res;
  }
  useEffect(() => {
    let _ = false;

    const products_copy = products.map((product) => {
      if (product.quantity < 1) {
        product.quantity = 1;
        _ = true;
      }

      return product;
    });

    if (_) {
      setProducts(products_copy);
    }
  }, [products]);

  return (
    <div>
      <Title title={t("cart")} />
      <div className="h-[calc(100vh_-_96px)] gap-4 lg:grid grid-cols-3">
        <div className="lg:col-start-1 lg:col-end-3">
          <ProductsTable handleAdd={handleAdd} />
        </div>
        <CartProducts
          setGlobalMessage={setGlobalMessage}
          getTotal={getTotal}
          isLoading={isLoading}
          handlePay={handlePay}
          globalMessage={globalMessage}
          products={products}
          setProducts={setProducts}
        />
      </div>
      {displaymodal && (
        <div className="fixed top-0 left-0 w-full h-screen bg-semiblack px-4 z-50 flex items-center justify-center">
          <div className="dark:bg-dark bg-white shadow-md p-4  rounded-md w-full max-w-xl flex flex-col gap-4">
            <div>Reciept</div>
            <div className="overflow-scroll scrollbar pr-2 max-h-96">
              <div ref={receipt}>
                <div className="h-16 flex items-center justify-center text-xl font-bold">
                  <span>MACELLERIA CASABLANCA</span>
                </div>
                <table className="w-full border-b-2 ">
                  <tbody>
                    <tr>
                      <td className="font-semibold tracking-wide p-3">V.A.T</td>
                      <td className="text-end tracking-wide p-3">03610360962</td>
                    </tr>
                    <tr>
                      <td className="font-semibold tracking-wide p-3">Created at</td>
                      <td className="text-end tracking-wide p-3">{new Date().toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-start p-3 tracking-wide">{t("product")}</th>
                      <th className="text-start p-3 tracking-wide">{t("price")}</th>
                      <th className="text-start p-3 tracking-wide">{t("quantity")}</th>
                      <th className="text-start p-3 tracking-wide">
                        {t("toal")} {t("price")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td className="p-3 tracking-wide">{product.name}</td>
                          <td className="p-3 tracking-wide">{product.price}</td>
                          <td className="p-3 tracking-wide">{product.quantity}</td>
                          <td className="p-3 tracking-wide">{product.quantity * product.price}</td>
                        </tr>
                      );
                    })}
                    <tr className="border-t-2">
                      <td className="p-3 tracking-wide" colSpan={3}>
                        Total
                      </td>
                      <td className="p-3 tracking-wide">{getTotal()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex  gap-4">
              <Button
                variation="success"
                content={t("print")}
                handleClick={() => {
                  handlePrint();
                  setProducts([]);
                  setGlobalMessage("");
                  setDisplayModal(false);
                }}
              />
              <Button
                variation="error"
                content={t("close")}
                handleClick={() => {
                  setProducts([]);
                  setDisplayModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
