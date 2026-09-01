import axios, { type AxiosError } from 'axios'

import { tokenService } from '@/services/tokenService'

type UnauthorizedHandler = (error: AxiosError) => void

let unauthorizedHandler: UnauthorizedHandler | null = null

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    Accept: 'application/json',
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
      if (unauthorizedHandler) unauthorizedHandler(error)
      else tokenService.clear()
    }

    return Promise.reject(error)
  },
)

export function configureUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
  unauthorizedHandler = typeof handler === 'function' ? handler : null
}

export default api
