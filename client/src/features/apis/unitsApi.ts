import api from './api';

const unitsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUnits: build.query({
      query: () => '/units',
    }),
    showUnit: build.query({
      query: (id: number) => `/units/${id}`,
    }),
    storeUnit: build.mutation({
      query: (data: any) => ({ url: '/units', method: 'POST', body: data }),
    }),
    updateUnit: build.query({
      query: ({ id, data }: { id: number; data: any }) => ({
        url: `/units/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUnit: build.query({
      query: (id: number) => ({ url: `/units/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useGetUnitsQuery,
  useShowUnitQuery,
  useStoreUnitMutation,
  useUpdateUnitQuery,
  useDeleteUnitQuery,
} = unitsApi;
