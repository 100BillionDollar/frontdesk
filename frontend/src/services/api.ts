import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

// Base API slice — har feature apne endpoints injectEndpoints() se add karega.
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Visitor'],
  endpoints: () => ({}),
})
