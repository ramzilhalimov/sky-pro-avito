import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { AdsApi } from '../Service/AdsApi'
import { AuthApi } from '../Service/AuthApi'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [AdsApi.reducerPath]: AdsApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AdsApi.middleware, AuthApi.middleware),
})
