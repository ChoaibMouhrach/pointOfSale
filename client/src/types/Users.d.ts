import { Paginate } from './Pagination';

export type User = {
  id: number;
  created_at: string;
  updated_at: string;
};

export type PaginateUser = Paginate & { data: User[] };
