import { Identifier } from './commont';
import { Paginate } from './Pagination';

export type User = Identifier & {
  email: string;
};

export type PaginateUser = Paginate & { data: User[] };
