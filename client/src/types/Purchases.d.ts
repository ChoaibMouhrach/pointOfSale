import { Identifier } from "./common";
import { Product } from "./Product";
import { Supplier } from "./Supplier";

export type UpdatePurchase = {
  supplier_id?: number;
  products?: {
    id: string;
    quantity: number;
    total_cost: number;
  }[];
};

export type Purchase = Identifier & {
  supplier_id: number;
  total_cost: number | null;
  products_count: number;
};

export type PurchaseSupplier = Purchase & {
  supplier: Supplier;
};

export type PurchaseProducts = Purchase & {
  products: (Product & {
    pivot: {
      purchase_id: number;
      product_id: string;
      quantity: number;
      total_cost: number;
    };
  })[];
};

export type PurchaseSupplierProducts = PurchaseProducts & {
  supplier: Supplier;
};

export type PurchaseAny = Purchase | PurchaseProducts | PurchaseSupplier | PurchaseSupplierProducts;

export type StorePurchase = {
  supplier_id: number;
  products: {
    id: string;
    quantity: number;
    total_cost: number;
  }[];
};
