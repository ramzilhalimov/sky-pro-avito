import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8090/',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: userData,
      }),
      transformResponse: (response) => {
        localStorage.setItem('user_register_id', response.id)
        localStorage.setItem('user_register_email', response.email)
        localStorage.setItem('user_register_city', response.city)
        localStorage.setItem('user_register_name', response.name)
        localStorage.setItem('user_register_surname', response.surname)
        localStorage.setItem('user_register_phone', response.phone)
        return response
      },
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
      invalidatesTags: ['Ads'],
    }),
  }),
})
export const { useRegisterUserMutation, useLoginUserMutation } = AuthApi
