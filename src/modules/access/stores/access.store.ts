import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { accessApi } from '@/modules/access/api/access.api'
import type {
  OrganizationalUnit,
  Permission,
  Position,
  Profession,
  Role,
} from '@/modules/access/types/access.types'

export const useAccessStore = defineStore('access', () => {
  const roles = ref<Role[]>([])
  const permissions = ref<Permission[]>([])
  const organizationalUnits = ref<OrganizationalUnit[]>([])
  const positions = ref<Position[]>([])
  const professions = ref<Profession[]>([])
  const loading = ref(false)

  const catalogsLoaded = computed(
    () =>
      roles.value.length > 0 &&
      organizationalUnits.value.length > 0 &&
      positions.value.length > 0 &&
      professions.value.length > 0,
  )

  async function loadAccessMatrix(): Promise<void> {
    loading.value = true
    try {
      ;[roles.value, permissions.value] = await Promise.all([
        accessApi.getRoles(),
        accessApi.getPermissions(),
      ])
    } finally {
      loading.value = false
    }
  }

  async function loadUserCatalogs(force = false): Promise<void> {
    if (catalogsLoaded.value && !force) return

    loading.value = true
    try {
      ;[roles.value, organizationalUnits.value, positions.value, professions.value] =
        await Promise.all([
          accessApi.getRoles(),
          accessApi.getOrganizationalUnits(),
          accessApi.getPositions(),
          accessApi.getProfessions(),
        ])
    } finally {
      loading.value = false
    }
  }

  return {
    roles,
    permissions,
    organizationalUnits,
    positions,
    professions,
    loading,
    catalogsLoaded,
    loadAccessMatrix,
    loadUserCatalogs,
  }
})
