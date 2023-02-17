import api from './api';

const salesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSales: build.query({
      query: () => '/sales',
    }),
    showSale: build.query({
      query: (id: number) => `/sales/${id}`,
    }),
    storeSale: build.mutation({
      query: (data: any) => ({ url: '/sales', method: 'POST', body: data }),
    }),
    updateSale: build.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/sales/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteSale: build.mutation({
      query: (id: number) => ({ url: `/sales/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useGetSalesQuery,
  useShowSaleQuery,
  useStoreSaleMutation,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
} = salesApi;
