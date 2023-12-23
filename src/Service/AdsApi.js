import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQueryWithReauth = async (argc, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8090/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token')
      console.debug('Токен из стора', { token })
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  })

  const result = await baseQuery(argc, api, extraOptions)
  console.debug('результат первого запроса', { result })

  const forceLogout = () => {
    console.debug('Принудительная авторизация')
    localStorage.clear()
    window.location.href = '/login'
  }

  if (result?.status !== 401) {
    return result
  }

  const authorization =
    api.getState().authorization ?? localStorage.getItem('refresh')
  console.log(authorization)
  if (!authorization.refresh) {
    return forceLogout()
  }
}

export const AdsApi = createApi({
  reducerPath: 'Api',
  tagTypes: ['Ads'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAds: builder.query({
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
      query: (adId) => `ads/${adId}`,
      providesTags: ['Ads'],
    }),
    getUserInfo: builder.query({
      query: () => `user`,
      providesTags: ['Ads'],
    }),
    getAdsUser: builder.query({
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
      query: ({ access_token, refresh_token }) => ({
        url: 'auth/login',
        method: 'PUT',
        body: { access_token, refresh_token },
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
    addAds: builder.mutation({
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
    addImgAds: builder.mutation({
      query: ({ id, file }) => ({
        url: `ads/${id}/image`,
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['Ads'],
    }),

    delImgAds: builder.mutation({
      query: (data) => {
        const url = data.image.url
        return {
          url: `ads/${data.id}/image?file_url=${url}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Ads'],
    }),
    delAdsId: builder.mutation({
      query: ({ adId }) => {
        return { url: `ads/${adId}`, method: 'DELETE' }
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
    changeAvatar: builder.mutation({
      query: (fileData) => ({
        url: '/user/avatar',
        method: 'POST',
        body: fileData,
      }),
      invalidatesTags: ['Ads'],
    }),
  }),
})

export const {
  useGetAdsQuery,
  useGetAdsIdQuery,
  useGetUserInfoQuery,
  useRefreshTokenMutation,
  useGetAllCommentsQuery,
  useAddCommentMutation,
  useGetAllCurrentUserCommentsQuery,
  useAddAdsMutation,
  useEditAdsMutation,
  useAddImgAdsMutation,
  useDelImgAdsMutation,
  useDelAdsIdMutation,
  useUserUpdateMutation,
  useChangeAvatarMutation,
  useGetAdsUserQuery,
} = AdsApi
