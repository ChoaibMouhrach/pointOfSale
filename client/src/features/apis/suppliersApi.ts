import { generateUrl } from "../../helpers/apiHelpers";
import { GetParams } from "../../types/Api";
import { Paginate } from "../../types/Pagination";
import { StoreSupplier, Supplier, updateSupplier } from "../../types/Supplier";
import api from "./api";

const suppliersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSuppliers: build.query<
      (Paginate & { data: Supplier[] }) | Supplier[],
      GetParams
    >({
      query: ({ relations, fields, search, page, paginate }: GetParams) =>
        generateUrl({
          baseUrl: "/suppliers",
          relations,
          fields,
          search,
          page,
          paginate,
        }),
    }),
    showSuppliers: build.query<Supplier, number>({
      query: (id: number) => `/suppliers/${id}`,
    }),
    storeSupplier: build.mutation<Supplier, StoreSupplier>({
      query: (supplier: StoreSupplier) => ({
        url: "/suppliers",
        method: "POST",
        body: supplier,
      }),
    }),
    updateSupplier: build.mutation<
      Supplier,
      { id: number; supplier: updateSupplier }
    >({
      query: ({ id, supplier }: { id: number; supplier: updateSupplier }) => ({
        url: `/suppliers/${id}`,
        method: "PATCH",
        body: supplier,
      }),
    }),
    deleteSupplier: build.mutation<void, number>({
      query: (id: number) => ({ url: `/suppliers/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetSuppliersQuery,
  useShowSuppliersQuery,
  useStoreSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = suppliersApi;
