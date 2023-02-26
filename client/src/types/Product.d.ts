import { Identifier } from "./common";

export type Product = Identifier & {
  id: string;
  name: string;
  cost: number;
  price: number;
  stock: number;
  image: string;
  unit_id: number;
  brand_id: number;
  category_id: number;
};

export type UpdateProduct = {
  id?: string;
  name?: string;
  cost?: number;
  price?: number;
  stock?: number;
  image?: string;
  unit_id?: number;
  brand_id?: number;
  category_id?: number;
};

export type StoreProduct = {
  id: string;
  name: string;
  cost: number;
  price: number;
  stock: number;
  image?: Blob;
  unit_id: number;
  brand_id: number;
  category_id: number;
};
