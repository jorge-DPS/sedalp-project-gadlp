export type AccountStatus = 'active' | 'suspended'

export type EffectiveAccountStatus = 'active' | 'suspended' | 'disabled_by_staff' | 'deleted'

export interface CatalogSummaryApiResponse {
  id: number
  name: string
}

export interface AuthStaffMemberApiResponse {
  id: number
  first_names: string
  paternal_surname: string | null
  maternal_surname: string | null
  active: boolean
  organizational_unit: CatalogSummaryApiResponse | null
  position: CatalogSummaryApiResponse | null
  profession: CatalogSummaryApiResponse | null
}

export interface AuthUserApiResponse {
  id: number
  email: string
  account_status: AccountStatus
  effective_status: EffectiveAccountStatus
  can_access: boolean
  staff_member: AuthStaffMemberApiResponse | null
  roles: string[]
  permissions: string[]
  is_super_admin: boolean
  created_at: string | null
  updated_at: string | null
  deleted_at: string | null
}

export interface CatalogSummary {
  id: number
  name: string
}

export interface AuthStaffMember {
  id: number
  firstNames: string
  paternalSurname: string | null
  maternalSurname: string | null
  active: boolean
  organizationalUnit: CatalogSummary | null
  position: CatalogSummary | null
  profession: CatalogSummary | null
}

export interface AuthUser {
  id: number
  email: string
  accountStatus: AccountStatus
  effectiveStatus: EffectiveAccountStatus
  canAccess: boolean
  staffMember: AuthStaffMember | null
  roles: string[]
  permissions: string[]
  isSuperAdmin: boolean
  displayName: string
  avatarUrl: string | null
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
}

export interface ApiResource<T> {
  data: T
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: 'bearer'
  expires_in: number
}

export interface LoginResponse extends TokenResponse {
  message: string
}

export interface MessageResponse {
  message: string
}
