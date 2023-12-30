import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8090/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        headers.set('authorization', Bearer`${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ email, password, name, surname, city }) => ({
        url: '/auth/register',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: { email, password, name, surname, city },
      }),
      transformResponse: (response) => {
        localStorage.setItem('user_register_id', response.id)
        localStorage.setItem('user_register_email', response.email)
        localStorage.setItem('user_register_city', response.city)
        localStorage.setItem('user_register_name', response.name)
        localStorage.setItem('user_register_surname', response.surname)
        localStorage.setItem('user_register_phone', response.phone)
        localStorage.setItem('user_register_avatar', response.avatar)
      },
      invalidatesTags: ['Ads'],
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: { email, password },
      }),
      transformResponse: (response) => {
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('refresh_token', response.refresh_token)
        return response
      },
      invalidatesTags: ['Ads'],
    }),
  }),
})
export const { useRegisterUserMutation, useLoginUserMutation } = AuthApi
