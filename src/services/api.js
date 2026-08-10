import axios from 'axios'

import { tokenService } from '@/modules/auth/services/tokenService'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },

  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      tokenService.clear()
    }

    return Promise.reject(error)
  },
)

export default api