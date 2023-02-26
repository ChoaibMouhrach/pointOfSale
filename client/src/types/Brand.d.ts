import { Identifier } from "./common";

export type Brand = Identifier & { name: string };

export type StoreBrand = {
  name: string;
};

export type UpdateBrand = {
  name?: string;
};
