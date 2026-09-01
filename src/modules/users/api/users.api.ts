import api from '@/services/api'
import type { DataResponse, PaginatedResponse } from '@/shared/api/types'
import type {
  CreateUserPayload,
  UpdateUserPayload,
  UpdateUserStatusPayload,
  User,
  UserFilters,
} from '@/modules/users/types/user.types'

function normalizedParams(filters: UserFilters): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== '' && value !== undefined),
  ) as Record<string, string | number | boolean>
}

export const usersApi = {
  async index(filters: UserFilters): Promise<PaginatedResponse<User>> {
    const { data } = await api.get<PaginatedResponse<User>>('/admin/users', {
      params: normalizedParams(filters),
    })
    return data
  },

  async trash(filters: UserFilters): Promise<PaginatedResponse<User>> {
    const { data } = await api.get<PaginatedResponse<User>>('/admin/users/trash', {
      params: normalizedParams({
        search: filters.search,
        per_page: filters.per_page,
        page: filters.page,
      }),
    })
    return data
  },

  async create(payload: CreateUserPayload): Promise<User> {
    const { data } = await api.post<DataResponse<User>>('/admin/users', payload)
    return data.data
  },

  async update(userId: number, payload: UpdateUserPayload): Promise<User> {
    const { data } = await api.patch<DataResponse<User>>(`/admin/users/${userId}`, payload)
    return data.data
  },

  async updateRole(userId: number, role: string): Promise<User> {
    const { data } = await api.put<DataResponse<User>>(`/admin/users/${userId}/role`, { role })
    return data.data
  },

  async updateStatus(userId: number, payload: UpdateUserStatusPayload): Promise<User> {
    const { data } = await api.patch<DataResponse<User>>(`/admin/users/${userId}/status`, payload)
    return data.data
  },

  async remove(userId: number, reason: string): Promise<void> {
    await api.delete(`/admin/users/${userId}`, { data: { reason } })
  },

  async restore(userId: number, reason: string): Promise<User> {
    const { data } = await api.post<DataResponse<User>>(`/admin/users/${userId}/restore`, {
      reason,
    })
    return data.data
  },
}
