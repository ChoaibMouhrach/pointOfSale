import { generateUrl } from "../../helpers/apiHelpers";
import { GetParams } from "../../types/Api";
import { Paginate } from "../../types/Pagination";
import { StoreUnit, Unit, UpdateUnit } from "../../types/Unit";
import api from "./api";

const unitsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUnits: build.query<(Paginate & { data: Unit[] }) | Unit[], GetParams>({
      query: ({ relations, fields, search, paginate, page }: GetParams) =>
        generateUrl({
          baseUrl: "/units",
          relations,
          fields,
          search,
          paginate,
          page,
        }),
    }),
    showUnit: build.query<Unit, number>({
      query: (id: number) => `/units/${id}`,
    }),
    storeUnit: build.mutation<Unit, StoreUnit>({
      query: (unit: any) => ({ url: "/units", method: "POST", body: unit }),
    }),
    updateUnit: build.mutation<Unit, { id: number; unit: UpdateUnit }>({
      query: ({ id, unit }: { id: number; unit: UpdateUnit }) => ({
        url: `/units/${id}`,
        method: "PATCH",
        body: unit,
      }),
    }),
    deleteUnit: build.mutation<void, number>({
      query: (id: number) => ({ url: `/units/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetUnitsQuery,
  useShowUnitQuery,
  useStoreUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = unitsApi;
