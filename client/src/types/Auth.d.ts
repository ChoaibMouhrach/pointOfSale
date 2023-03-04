import { User } from "./User";

export type Login = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
