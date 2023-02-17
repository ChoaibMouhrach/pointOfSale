type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type Paginate = {
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  links: PaginationLink[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  current_page: number;
};
