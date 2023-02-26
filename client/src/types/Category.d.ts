import { Identifier } from "./common";

export type Category = Identifier & {
  name: string;
};

export type StoreCategory = {
  name: string;
};

export type UpdateCategory = {
  name?: string;
};
