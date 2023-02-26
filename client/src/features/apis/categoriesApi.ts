import { generateUrl } from "../../helpers/apiHelpers";
import { GetParams } from "../../types/Api";
import { Category, StoreCategory, UpdateCategory } from "../../types/Category";
import { Paginate } from "../../types/Pagination";
import api from "./api";

const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<
      (Paginate & { data: Category[] }) | Category[],
      GetParams
    >({
      query: ({ fields, relations, search, paginate, page }: GetParams) =>
        generateUrl({
          baseUrl: "/categories",
          fields,
          relations,
          search,
          paginate,
          page,
        }),
    }),
    showCategory: build.query<Category, number>({
      query: (id: number) => `/categories/${id}`,
    }),
    storeCategory: build.mutation<Category, StoreCategory>({
      query: (category: StoreCategory) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
    }),
    updateCategory: build.mutation<
      Category,
      { id: number; category: UpdateCategory }
    >({
      query: ({ id, category }: { id: number; category: UpdateCategory }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: category,
      }),
    }),
    deleteCategory: build.mutation<void, number>({
      query: (id: number) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useShowCategoryQuery,
  useStoreCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
