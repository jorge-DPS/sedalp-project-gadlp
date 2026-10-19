import api from '@/services/api'
import type { DataResponse, PaginatedResponse } from '@/shared/api/types'
import type {
  OrganizationalUnit,
  Permission,
  Position,
  Profession,
  Role,
} from '@/modules/access/types/access.types'

export const accessApi = {
  async createOrganizationalUnit(payload: {
    name: string
    code: string
    description: string | null
  }): Promise<OrganizationalUnit> {
    const { data } = await api.post<DataResponse<OrganizationalUnit>>(
      '/admin/organizational-units',
      { ...payload, active: true },
    )
    return data.data
  },

  async createProfession(payload: { name: string }): Promise<Profession> {
    const { data } = await api.post<DataResponse<Profession>>('/admin/professions', {
      ...payload,
      active: true,
    })
    return data.data
  },

  async getUserCatalogs(): Promise<{
    roles: Role[]
    organizational_units: OrganizationalUnit[]
    positions: Position[]
    professions: Profession[]
  }> {
    const { data } = await api.get<
      DataResponse<{
        roles: Role[]
        organizational_units: OrganizationalUnit[]
        positions: Position[]
        professions: Profession[]
      }>
    >('/admin/users/catalogs')
    return data.data
  },
  async getRoles(): Promise<Role[]> {
    const { data } = await api.get<DataResponse<Role[]>>('/admin/access/roles')
    return data.data
  },

  async getPermissions(): Promise<Permission[]> {
    const { data } = await api.get<DataResponse<Permission[]>>('/admin/access/permissions')
    return data.data
  },

  async getOrganizationalUnits(): Promise<OrganizationalUnit[]> {
    const { data } = await api.get<PaginatedResponse<OrganizationalUnit>>(
      '/admin/organizational-units',
      { params: { active: true, per_page: 100 } },
    )
    return data.data
  },

  async getPositions(): Promise<Position[]> {
    const { data } = await api.get<PaginatedResponse<Position>>('/admin/positions', {
      params: { active: true, per_page: 100 },
    })
    return data.data
  },

  async getProfessions(): Promise<Profession[]> {
    const { data } = await api.get<PaginatedResponse<Profession>>('/admin/professions', {
      params: { active: true, per_page: 100 },
    })
    return data.data
  },
}
