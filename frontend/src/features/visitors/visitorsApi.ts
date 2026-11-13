import { api } from '@/services/api'
import type { Visitor, VisitorCreate } from './types'

export const visitorsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getVisitors: build.query<Visitor[], void>({
      query: () => '/visitors',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Visitor' as const, id })),
              { type: 'Visitor', id: 'LIST' },
            ]
          : [{ type: 'Visitor', id: 'LIST' }],
    }),
    createVisitor: build.mutation<Visitor, VisitorCreate>({
      query: (body) => ({
        url: '/visitors',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Visitor', id: 'LIST' }],
    }),
  }),
})

export const { useGetVisitorsQuery, useCreateVisitorMutation } = visitorsApi
