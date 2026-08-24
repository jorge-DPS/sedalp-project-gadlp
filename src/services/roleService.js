import  api  from '@/services/api'

export const roleService = {
  getAll() {
    return api.get('/roles')
  },
  getById(id) {
    return api.get(`/roles/${id}`)
  },
  create(payload) {
    return api.post('/roles', payload)
  },
  update(id, payload) {
    return api.put(`/roles/${id}`, payload)
  },
  remove(id) {
    return api.delete(`/roles/${id}`)
  },
}
