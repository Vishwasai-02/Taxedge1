import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type {
  AuthState,
  AuthUser,
} from '../../modules/authentication/types/auth.types'

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
}

interface LoginPayload {
  user: AuthUser
  accessToken: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.isAuthenticated = true
    },

    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer