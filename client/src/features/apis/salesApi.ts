import { generateUrl } from "../../helpers/apiHelpers";
import { GetParams } from "../../types/Api";
import { Sale, SaleProducts, StoreSale } from "../../types/Sale";
import api from "./api";

const salesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSales: build.query<SaleProducts, GetParams>({
      query: ({ fields, search, paginate, page, relations }: GetParams) =>
        generateUrl({
          baseUrl: "/sales",
          fields,
          search,
          paginate,
          page,
          relations,
        }),
    }),
    showSale: build.query<SaleProducts, number>({
      query: (id: number) => `/sales/${id}?relations=products`,
    }),
    storeSale: build.mutation<Sale, StoreSale>({
      query: (sale: StoreSale) => ({
        url: "/sales",
        method: "POST",
        body: sale,
      }),
    }),
    updateSale: build.mutation<Sale, { id: number; sale: StoreSale }>({
      query: ({ id, sale }: { id: number; sale: StoreSale }) => ({
        url: `/sales/${id}`,
        method: "PATCH",
        body: sale,
      }),
    }),
    deleteSale: build.mutation<void, number>({
      query: (id: number) => ({ url: `/sales/${id}`, method: "DELETE" }),
    }),
  }),
});

export const { useGetSalesQuery, useShowSaleQuery, useStoreSaleMutation, useUpdateSaleMutation, useDeleteSaleMutation } = salesApi;
