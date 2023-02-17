import api from './api';

const purchasesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPurchases: build.query({
      query: () => '/purchases',
    }),
    showPurchase: build.query({
      query: (id: number) => `/purchases/${id}`,
    }),
    storePurchase: build.mutation({
      query: (data: any) => ({
        url: `/purchases`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePurchase: build.mutation({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/purchases/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deletePurchase: build.mutation({
      query: (id: number) => ({
        url: `/purchases/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {} = purchasesApi;
