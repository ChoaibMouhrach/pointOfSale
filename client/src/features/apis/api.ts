import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api/',
  prepareHeaders: (headers) => {
    if (localStorage.getItem('auth_token')) {
      headers.set(
        'authorization',
        `Bearer ${localStorage.getItem('auth_token')}`
      );
    }

    return headers;
  },
});

const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});

export default api;
