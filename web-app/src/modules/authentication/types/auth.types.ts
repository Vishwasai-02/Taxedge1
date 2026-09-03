export type UserRole =
  | 'CUSTOMER'
  | 'AGENT'
  | 'MANAGER'
  | 'ADMIN'
  | 'SUPER_ADMIN'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
}