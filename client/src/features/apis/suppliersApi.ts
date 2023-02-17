import api from './api';

const suppliersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSuppliers: build.query({
      query: () => '/products',
    }),
    showSuppliers: build.query({
      query: (id: number) => `/products/${id}`,
    }),
    storeSupplier: build.mutation({
      query: (data: any) => ({ url: '/products', method: 'POST', body: data }),
    }),
    updateSuppliers: build.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteSuppliers: build.mutation({
      query: (id: number) => ({ url: `/products/${id}`, method: 'DELETE' }),
    }),
  }),
});
