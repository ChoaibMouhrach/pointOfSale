import { Identifier } from "./common";

export type Unit = Identifier & {
  name: string;
  shortname: string;
};

export type StoreUnit = {
  name: string;
  shortname: string;
};

export type UpdateUnit = {
  name?: string;
  shortname?: string;
};
