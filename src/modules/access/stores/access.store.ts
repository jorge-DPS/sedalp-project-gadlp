import { defineStore } from 'pinia'
import { ref } from 'vue'

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

  const catalogsLoaded = ref(false)
  const catalogsError = ref('')

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
    catalogsError.value = ''
    try {
      const catalogs = await accessApi.getUserCatalogs()
      roles.value = catalogs.roles
      organizationalUnits.value = catalogs.organizational_units
      positions.value = catalogs.positions
      professions.value = catalogs.professions
      catalogsLoaded.value = true
    } catch {
      catalogsLoaded.value = false
      catalogsError.value = 'No se pudieron cargar las opciones. Reintenta antes de guardar.'
    } finally {
      loading.value = false
    }
  }

  async function createOrganizationalUnit(
    payload: Parameters<typeof accessApi.createOrganizationalUnit>[0],
  ): Promise<OrganizationalUnit> {
    const item = await accessApi.createOrganizationalUnit(payload)
    organizationalUnits.value = [
      ...organizationalUnits.value.filter((existing) => existing.id !== item.id),
      item,
    ].sort((a, b) => a.name.localeCompare(b.name, 'es'))
    return item
  }

  async function createProfession(
    payload: Parameters<typeof accessApi.createProfession>[0],
  ): Promise<Profession> {
    const item = await accessApi.createProfession(payload)
    professions.value = [
      ...professions.value.filter((existing) => existing.id !== item.id),
      item,
    ].sort((a, b) => a.name.localeCompare(b.name, 'es'))
    return item
  }

  return {
    createOrganizationalUnit,
    createProfession,
    roles,
    permissions,
    organizationalUnits,
    positions,
    professions,
    loading,
    catalogsLoaded,
    catalogsError,
    loadAccessMatrix,
    loadUserCatalogs,
  }
})
