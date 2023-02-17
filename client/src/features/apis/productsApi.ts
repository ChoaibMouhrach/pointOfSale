import api from './api';

const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => '/products',
    }),
    showProduct: build.query({
      query: (id: number) => `/products/${id}`,
    }),
    storeProduct: build.mutation({
      query: (body: any) => ({
        url: '/products',
        mthod: 'POST',
        body,
      }),
    }),
    updateProduct: build.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteProduct: build.mutation({
      query: (id: number) => ({
        url: `/products/${id}`,
        method: 'DELETE',
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
