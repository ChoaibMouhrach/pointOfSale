import { Identifier } from "./common";
import { Product } from "./Product";

export type Sale = Identifier;

export type SaleProducts = Identifier & {
  total_earnings: number | null;
  total_cost: number | null;
  products_count: number;
  products: [
    Product & {
      pivot: {
        sale_id: number;
        product_id: string;
        quantity: number;
        total_price: number;
      };
    }
  ];
};

export type StoreSale = {
  products: {
    id: number;
    quantity: number;
    total_price: number;
  }[];
};
