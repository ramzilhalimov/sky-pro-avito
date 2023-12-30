import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { forceLogout } from '../helpers'

const baseQueryWithReauth = async (argc, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8090/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token')
      if (token !== null && token !== undefined) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  })

  const result = await baseQuery(argc, api, extraOptions)
  if (result?.error?.status !== 401) {
    return result
  }

  const refreshResult = await baseQuery(
    {
      url: 'auth/login',
      method: 'PUT',
      body: {
        refresh_token: localStorage.getItem('refresh_token'),
        access_token: localStorage.getItem('access_token'),
      },
    },
    api,
    extraOptions
  )
  console.debug(refreshResult)
  if (!refreshResult.data.access_token && !refreshResult.data.refresh_token) {
    return forceLogout()
  }
  localStorage.setItem('access_token', refreshResult.data.access_token)
  localStorage.setItem('refresh_token', refreshResult.data.refresh_token)

  const retryResult = await baseQuery(args, api, extraOptions)

  if (retryResult?.error?.status === 401) {
    return forceLogout()
  }
  return retryResult
}

export const AdsApi = createApi({
  reducerPath: 'Api',
  tagTypes: ['Ads'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: () => 'ads',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Ads', id })),
              { type: 'Ads', id: 'LIST' },
            ]
          : [{ type: 'Ads', id: 'LIST' }],
    }),
    getAdsId: builder.query({
      query: (id) => `ads/${id}`,
      providesTags: ['Ads'],
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: 'user',
      }),
      transformResponse: (response) => {
        localStorage.setItem('user_register_id', response.id)
        localStorage.setItem('user_register_email', response.email)
        localStorage.setItem('user_register_city', response.city)
        localStorage.setItem('user_register_name', response.name)
        localStorage.setItem('user_register_surname', response.surname)
        localStorage.setItem('user_register_phone', response.phone)
        localStorage.setItem('user_register_avatar', response.avatar)
        localStorage.setItem('user_data', JSON.stringify(response))
        return response
      },
      providesTags: ['Ads'],
    }),
    getAdsCurrentUser: builder.query({
      query: () => `ads/me`,

      providesTags: ['Ads'],
    }),
    getAllCurrentUserComments: builder.query({
      query: (id) => `ads/${id}/comments`,

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Ads', id })),
              { type: 'Ads', id: 'LIST' },
            ]
          : [{ type: 'Ads', id: 'LIST' }],
    }),
    getAllComments: builder.query({
      query: () => 'comments',
      providesTags: ['Ads'],
    }),
    addComment: builder.mutation({
      query: ({ id, text }) => ({
        url: `ads/${id}/comments`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: [{ type: 'Ads', id: 'LIST' }],
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: 'auth/login',
        method: 'PUT',
        body: {
          access_token: localStorage.getItem('access_token'),
          refresh_token: localStorage.getItem('refresh_token'),
        },
      }),
      onError: (error) => {
        console.error('Error refreshing token:', error)
        return { error: 'Token refresh failed' }
      },
      transformResponse: (response) => {
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('refresh_token', response.refresh_token)
        return response
      },
    }),
    addNewAds: builder.mutation({
      query: ({ title, description, price }) => ({
        url: `ads?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(
          description
        )}&price=${encodeURIComponent(price)}`,
        method: 'POST',
        body: 'file',
      }),
      invalidatesTags: ['Ads'],
    }),

    editAds: builder.mutation({
      query: ({ title, description, price, id }) => ({
        url: `ads/${id}`,
        method: 'PATCH',
        body: {
          title: title,
          description: description,
          price: price,
        },
      }),
      invalidatesTags: ['Ads'],
    }),
    addNewImgAds: builder.mutation({
      query: ({ id, file }) => ({
        url: `ads/${id}/image`,
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['Ads'],
    }),

    deleteImgAds: builder.mutation({
      query: (data) => {
        const url = data.image.url
        return {
          url: `ads/${data.id}/image?file_url=${url}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Ads'],
    }),
    deleteAds: builder.mutation({
      query: ({ id }) => {
        return { url: `ads/${id}`, method: 'DELETE' }
      },
      invalidatesTags: ['Ads'],
    }),
    userUpdate: builder.mutation({
      query: (userData) => ({
        url: 'user',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['Ads'],
    }),
    uploadUserAvatar: builder.mutation({
      query: (formData) => ({
        url: '/user/avatar',
        method: 'POST',
        body: formData,
      }),
      providesTags: ['Ads'],
    }),
  }),
})

export const {
  useGetAllAdsQuery,
  useGetAdsIdQuery,
  useGetUserInfoQuery,
  useRefreshTokenMutation,
  useGetAllCommentsQuery,
  useAddCommentMutation,
  useGetAllCurrentUserCommentsQuery,
  useAddNewAdsMutation,
  useEditAdsMutation,
  useAddNewImgAdsMutation,
  useDeleteImgAdsMutation,
  useDeleteAdsMutation,
  useUserUpdateMutation,
  useUploadUserAvatarMutation,
  useGetAdsCurrentUserQuery,
} = AdsApi
