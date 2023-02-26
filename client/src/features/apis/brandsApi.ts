import { generateUrl } from "../../helpers/apiHelpers";
import { GetParams } from "../../types/Api";
import { Brand, StoreBrand, UpdateBrand } from "../../types/Brand";
import { Paginate } from "../../types/Pagination";
import api from "./api";

const brandsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query<(Paginate & { data: Brand[] }) | Brand[], GetParams>(
      {
        query: ({ fields, relations, search, page, paginate }: GetParams) =>
          generateUrl({
            baseUrl: "/brands",
            fields,
            relations,
            search,
            page,
            paginate,
          }),
      }
    ),
    showBrand: build.query<Brand, number>({
      query: (id: number) => `/brands/${id}`,
    }),
    storeBrand: build.mutation<Brand, StoreBrand>({
      query: (brand: StoreBrand) => ({
        url: "/brands",
        method: "POST",
        body: brand,
      }),
    }),
    updateBrand: build.mutation<Brand, { id: number; brand: UpdateBrand }>({
      query: ({ id, brand }: { id: number; brand: UpdateBrand }) => ({
        url: `/brands/${id}`,
        method: "PATCH",
        body: brand,
      }),
    }),
    deleteBrand: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useShowBrandQuery,
  useStoreBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
