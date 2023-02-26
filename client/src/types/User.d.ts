import { Identifier } from "./common";

export type User = Identifier & {
  name: string;
  email: string;
  email_verified_at: string | null;
};

export type StoreUser = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type UpdateUser = {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
};
