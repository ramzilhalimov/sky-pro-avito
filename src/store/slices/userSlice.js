import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  token: null,
  id: null,
  ads: [],
  setUserAds: [],
}

const userSlise = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAds(state, action) {
      state.ads = action.payload
    },
    setUserAds(state, action) {
      state.setUserAds = action.payload
    },
  },
})

export const { setAds, setUserAds } = userSlise.actions

export default userSlise.reducer
