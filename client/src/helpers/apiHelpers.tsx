type GenerateUrlParams = {
  baseUrl: string;
  relations?: string;
  fields?: string;
  page?: number;
  paginate?: number;
  search?: string;
};

/**
 * generate url from relations, fields, page, paginate
 * @returns string full url
 */
export function generateUrl({
  baseUrl,
  relations,
  fields,
  page,
  paginate,
  search,
}: GenerateUrlParams): string {
  const query_params: string[] = [];

  if (relations) query_params.push(`relations=${relations}`);

  if (fields) query_params.push(`fields=${fields}`);

  if (page) query_params.push(`page=${page}`);

  if (paginate) query_params.push(`paginate=${paginate}`);

  if (search) query_params.push(`search=${search}`);

  return `${baseUrl}?${query_params.join("&")}`;
}
