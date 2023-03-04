import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/",
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");

    if (localStorage.getItem("authToken")) {
      headers.set("authorization", `Bearer ${localStorage.getItem("authToken")}`);
    }

    return headers;
  },
});

const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});

export default api;
