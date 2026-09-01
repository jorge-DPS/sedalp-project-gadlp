import api from '@/services/api'
import type {
  ApiResource,
  AuthUserApiResponse,
  LoginCredentials,
  LoginResponse,
  MessageResponse,
  TokenResponse,
} from '@/types/auth'

export const authService = {
  login(credentials: LoginCredentials) {
    return api.post<LoginResponse>('/auth/login', credentials)
  },

  me() {
    return api.get<ApiResource<AuthUserApiResponse>>('/auth/me')
  },

  logout() {
    return api.post<MessageResponse>('/auth/logout')
  },

  refresh() {
    return api.post<TokenResponse>('/auth/refresh')
  },
}
