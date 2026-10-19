import type { OrganizationalUnit, Position, Profession } from '@/modules/access/types/access.types'

export type AccountStatus = 'active' | 'suspended'
export type EffectiveStatus = 'active' | 'suspended' | 'disabled_by_staff' | 'deleted'

export interface StaffMember {
  id: number
  first_names: string
  paternal_surname: string | null
  maternal_surname: string | null
  birth_date: string | null
  ci: string
  ci_complement: string | null
  phone: string | null
  email: string | null
  active: boolean
  organizational_unit: Pick<OrganizationalUnit, 'id' | 'name'> | null
  position: Pick<Position, 'id' | 'name'> | null
  profession: Pick<Profession, 'id' | 'name'> | null
}

export interface User {
  id: number
  email: string
  account_status: AccountStatus
  effective_status: EffectiveStatus
  can_access: boolean
  staff_member: StaffMember | null
  roles: string[]
  permissions: string[]
  is_super_admin: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface UserFilters {
  search?: string
  role?: string
  account_status?: AccountStatus | ''
  staff_active?: boolean | ''
  organizational_unit_id?: number | ''
  position_id?: number | ''
  profession_id?: number | ''
  per_page?: number
  page?: number
}

export interface StaffMemberPayload {
  first_names: string
  paternal_surname?: string | null
  maternal_surname?: string | null
  birth_date?: string | null
  ci: string
  ci_complement?: string | null
  phone?: string | null
  email?: string | null
  organizational_unit_id?: number | null
  position_id: number
  profession_id?: number | null
}

export interface CreateUserPayload {
  email: string
  password: string
  password_confirmation: string
  role: string
  staff_member: StaffMemberPayload
}

export interface UpdateUserPayload {
  email?: string
  password?: string
  password_confirmation?: string
  staff_member?: Partial<StaffMemberPayload>
}

export interface UpdateUserStatusPayload {
  status: AccountStatus
  reason: string
}
