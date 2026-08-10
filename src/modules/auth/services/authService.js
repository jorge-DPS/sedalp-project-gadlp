import api from '@/services/api'

export const authService = {
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  me() {
    return api.get('/auth/me')
  },

  logout() {
    return api.post('/auth/logout')
  },

  refresh() {
    return api.post('/auth/refresh')
  },
}