import { generateUrl } from "../../helpers/apiHelpers";
import { GetParams } from "../../types/Api";
import { Paginate } from "../../types/Pagination";
import {
  Purchase,
  PurchaseAny,
  StorePurchase,
  updatePurchase,
} from "../../types/Purchases";
import api from "./api";

const purchasesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPurchases: build.query<
      (Paginate & { data: PurchaseAny[] }) | PurchaseAny[],
      GetParams
    >({
      query: ({ relations, paginate, page, search, fields }: GetParams) =>
        generateUrl({
          baseUrl: "/purchases",
          relations,
          fields,
          paginate,
          page,
          search,
        }),
    }),
    showPurchase: build.query<PurchaseAny, number>({
      query: (id: number) => `/purchases/${id}`,
    }),
    storePurchase: build.mutation<Purchase, StorePurchase>({
      query: (purchase: StorePurchase) => ({
        url: "/purchases",
        method: "POST",
        body: purchase,
      }),
    }),
    updatePurchase: build.mutation<
      Purchase,
      { id: number; purchase: updatePurchase }
    >({
      query: ({ id, purchase }: { id: number; purchase: updatePurchase }) => ({
        url: `/purchases/${id}`,
        method: "PATCH",
        body: purchase,
      }),
    }),
    deletePurchase: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/purchases/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPurchasesQuery,
  useShowPurchaseQuery,
  useStorePurchaseMutation,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchasesApi;
