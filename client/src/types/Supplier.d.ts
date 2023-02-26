import { Identifier } from "./common";

export type Supplier = Identifier & {
  name: string;
  email: string;
  vat: string;
  phone: string;
};

export type StoreSupplier = {
  name: string;
  email: string;
  vat: string;
  phone: string;
};

export type updateSupplier = {
  name?: string;
  email?: string;
  vat?: string;
  phone?: string;
};
