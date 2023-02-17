import api from './api';

const brandsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query({
      query: () => '/brands',
    }),
    showBrand: build.query({
      query: (id: number) => `/brands/${id}`,
    }),
    storeBrand: build.mutation({
      query: (body: any) => ({
        url: '/brands',
        method: 'POST',
        body,
      }),
    }),
    updateBrand: build.mutation({
      query: ({ id, brand }: { id: number; brand: any }) => ({
        url: `/brands/${id}`,
        method: 'PATCH',
        body: brand,
      }),
    }),
    deleteBrand: build.mutation({
      query: (id: number) => ({
        url: `/brands/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

const {
  useGetBrandsQuery,
  useShowBrandQuery,
  useStoreBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
