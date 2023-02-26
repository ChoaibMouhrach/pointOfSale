import { generateUrl } from "../../helpers/apiHelpers";
import { GetParams } from "../../types/Api";
import { Paginate } from "../../types/Pagination";
import { Product, StoreProduct, UpdateProduct } from "../../types/Product";
import api from "./api";

const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<
      (Paginate & { data: Product[] }) | Product[],
      GetParams
    >({
      query: ({ relations, fields, page, paginate, search }: GetParams) =>
        generateUrl({
          baseUrl: "/products",
          relations,
          fields,
          page,
          paginate,
          search,
        }),
    }),
    showProduct: build.query<Product, string>({
      query: (id: string) => `/products/${id}`,
    }),
    storeProduct: build.mutation<Product, FormData>({
      query: (product: FormData) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: build.mutation<Product, { id: string; product: FormData }>({
      query: ({ id, product }: { id: string; product: FormData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: product,
      }),
    }),
    deleteProduct: build.mutation<void, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useShowProductQuery,
  useStoreProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
