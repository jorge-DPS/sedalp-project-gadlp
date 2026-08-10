import { api } from '@/services/api'

export const userService = {
  getAll() {
    return api.get('/users')
  },
  getById(id) {
    return api.get(`/users/${id}`)
  },
  create(payload) {
    return api.post('/users', payload)
  },
  update(id, payload) {
    return api.put(`/users/${id}`, payload)
  },
  remove(id) {
    return api.delete(`/users/${id}`)
  },
}
