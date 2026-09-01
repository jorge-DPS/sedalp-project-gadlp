import { defineStore } from 'pinia'
import { ref } from 'vue'

import { usersApi } from '@/modules/users/api/users.api'
import type {
  CreateUserPayload,
  UpdateUserPayload,
  UpdateUserStatusPayload,
  User,
  UserFilters,
} from '@/modules/users/types/user.types'
import type { PaginationMeta } from '@/shared/api/types'

const emptyMeta: PaginationMeta = {
  current_page: 1,
  from: null,
  last_page: 1,
  links: [],
  path: '',
  per_page: 15,
  to: null,
  total: 0,
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const meta = ref<PaginationMeta>({ ...emptyMeta })
  const loading = ref(false)
  const saving = ref(false)

  async function fetchUsers(filters: UserFilters, trashed = false): Promise<void> {
    loading.value = true
    try {
      const response = trashed ? await usersApi.trash(filters) : await usersApi.index(filters)
      users.value = response.data
      meta.value = response.meta
    } finally {
      loading.value = false
    }
  }

  async function createUser(payload: CreateUserPayload): Promise<User> {
    saving.value = true
    try {
      return await usersApi.create(payload)
    } finally {
      saving.value = false
    }
  }

  async function updateUser(userId: number, payload: UpdateUserPayload): Promise<User> {
    saving.value = true
    try {
      return await usersApi.update(userId, payload)
    } finally {
      saving.value = false
    }
  }

  async function updateRole(userId: number, role: string): Promise<User> {
    saving.value = true
    try {
      return await usersApi.updateRole(userId, role)
    } finally {
      saving.value = false
    }
  }

  async function updateStatus(userId: number, payload: UpdateUserStatusPayload): Promise<User> {
    saving.value = true
    try {
      return await usersApi.updateStatus(userId, payload)
    } finally {
      saving.value = false
    }
  }

  async function removeUser(userId: number, reason: string): Promise<void> {
    saving.value = true
    try {
      await usersApi.remove(userId, reason)
    } finally {
      saving.value = false
    }
  }

  async function restoreUser(userId: number, reason: string): Promise<User> {
    saving.value = true
    try {
      return await usersApi.restore(userId, reason)
    } finally {
      saving.value = false
    }
  }

  return {
    users,
    meta,
    loading,
    saving,
    fetchUsers,
    createUser,
    updateUser,
    updateRole,
    updateStatus,
    removeUser,
    restoreUser,
  }
})
