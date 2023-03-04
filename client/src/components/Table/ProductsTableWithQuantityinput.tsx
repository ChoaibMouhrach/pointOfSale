import React from "react";
import { MdOutlineRemove } from "react-icons/md";
import { Product } from "../../types/Product";
import Button from "../Button";

type ProductsTableWithQuantityinputProps = {
  products: (Product & { quantity: number })[];
  setProducts: React.Dispatch<React.SetStateAction<any>>;
};

const ProductsTableWithQuantityinput = ({ products, setProducts }: ProductsTableWithQuantityinputProps) => {
  return (
    <div className="w-full overflow-x-scroll scrollbar">
      <table className="w-full bg-white rounded-md dark:bg-dark-gray">
        <thead className="rounded-md">
          <tr>
            <th className="bg-primary text-white rounded-l-md tracking-wide p-3 text-left">id</th>
            <th className="bg-primary text-white tracking-wide p-3 text-left">name</th>
            <th className="bg-primary text-white tracking-wide p-3 text-left">price</th>
            <th className="bg-primary text-white tracking-wide p-3 text-left">cost</th>
            <th className="bg-primary text-white tracking-wide p-3 text-left">stock</th>
            <th className="bg-primary text-white tracking-wide p-3 text-left">Created at </th>
            <th className="bg-primary text-white tracking-wide p-3 text-left">Quantity</th>
            <th className="bg-primary text-white rounded-r-md tracking-wide p-3 text-left">Options</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((product) => {
              return (
                <tr key={product.id}>
                  <td className="p-3 tracking-wide">{product.id}</td>
                  <td className="p-3 tracking-wide">{product.name}</td>
                  <td className="p-3 tracking-wide">{product.price}</td>
                  <td className="p-3 tracking-wide">{product.cost}</td>
                  <td className="p-3 tracking-wide">{product.stock}</td>
                  <td className="p-3 tracking-wide">{product.created_at}</td>
                  <td className="p-3 tracking-wide">
                    <input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProducts(
                          products.map((p) => {
                            if (p.id === product.id) {
                              p.quantity = +e.target.value;
                            }
                            return p;
                          })
                        );
                      }}
                      min="1"
                      type="number"
                      className="dark:bg-dark  bg-gray-300 p-2 rounded-md outline-none"
                      value={String(product.quantity)}
                    />
                  </td>
                  <td className="p-3 tracking-wide">
                    <Button
                      handleClick={() => {
                        setProducts(products.filter((p) => p.id !== product.id));
                      }}
                      className="w-16 bg-transparent text-danger h-fit  text-2xl hover:bg-transparent"
                      content={<MdOutlineRemove />}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="p-3 text-center tracking-wide" colSpan={8}>
                Empty at the moment
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTableWithQuantityinput;
