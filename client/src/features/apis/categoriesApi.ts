import api from './api';

const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `/categories`,
    }),
    showCategory: build.query({
      query: (id: number) => `/categories/${id}`,
    }),
    storeCategory: build.mutation({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
    }),
    updateCategory: build.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteCategory: build.mutation({
      query: (id: number) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
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
