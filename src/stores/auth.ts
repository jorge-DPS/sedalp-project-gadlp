import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { authService } from '@/services/authService'
import { tokenService } from '@/services/tokenService'
import type {
  AuthStaffMemberApiResponse,
  AuthUser,
  AuthUserApiResponse,
  CatalogSummaryApiResponse,
  LoginCredentials,
} from '@/types/auth'

function mapCatalogSummary(value: CatalogSummaryApiResponse | null) {
  if (!value) return null

  return {
    id: value.id,
    name: value.name,
  }
}

function mapStaffMember(value: AuthStaffMemberApiResponse | null) {
  if (!value) return null

  return {
    id: value.id,
    firstNames: value.first_names,
    paternalSurname: value.paternal_surname,
    maternalSurname: value.maternal_surname,
    active: value.active,
    organizationalUnit: mapCatalogSummary(value.organizational_unit),
    position: mapCatalogSummary(value.position),
    profession: mapCatalogSummary(value.profession),
  }
}

function mapAuthUser(value: AuthUserApiResponse): AuthUser {
  const staffMember = mapStaffMember(value.staff_member)
  const displayName = staffMember
    ? [staffMember.firstNames, staffMember.paternalSurname, staffMember.maternalSurname]
        .filter(Boolean)
        .join(' ')
    : value.email

  return {
    id: value.id,
    email: value.email,
    accountStatus: value.account_status,
    effectiveStatus: value.effective_status,
    canAccess: value.can_access,
    staffMember,
    roles: [...value.roles],
    permissions: [...value.permissions],
    isSuperAdmin: value.is_super_admin,
    displayName,
    avatarUrl: null,
    createdAt: value.created_at,
    updatedAt: value.updated_at,
    deletedAt: value.deleted_at,
  }
}

export const useAuthStore = defineStore('auth', () => {
  tokenService.removeLegacyUser()

  const token = ref<string | null>(tokenService.getToken())
  const user = ref<AuthUser | null>(null)
  const sessionInitialized = ref(false)
  const isInitializing = ref(false)
  const isAuthenticating = ref(false)
  const isLoggingOut = ref(false)

  let initializationPromise: Promise<boolean> | null = null

  const currentUser = computed(() => user.value)
  const isAuthenticated = computed(() => Boolean(token.value && user.value))
  const roles = computed(() => user.value?.roles ?? [])
  const permissions = computed(() => user.value?.permissions ?? [])
  const isSuperAdmin = computed(() => user.value?.isSuperAdmin ?? false)

  function persistToken(value: string | null): void {
    token.value = value

    if (value) tokenService.setToken(value)
    else tokenService.removeToken()
  }

  function persistUser(value: AuthUser | null): void {
    user.value = value
  }

  function clearSession(): void {
    token.value = null
    user.value = null
    sessionInitialized.value = true
    tokenService.clear()
  }

  async function fetchCurrentUser(): Promise<AuthUser | null> {
    if (!token.value) {
      persistUser(null)
      return null
    }

    const response = await authService.me()
    const responseUser = response.data.data

    if (!responseUser || typeof responseUser !== 'object' || Array.isArray(responseUser)) {
      throw new Error('El servidor no devolvió un usuario autenticado válido.')
    }

    const currentUserData = mapAuthUser(responseUser)
    persistUser(currentUserData)

    return currentUserData
  }

  async function initializeSession(): Promise<boolean> {
    if (sessionInitialized.value) return isAuthenticated.value
    if (initializationPromise) return initializationPromise

    initializationPromise = (async () => {
      isInitializing.value = true

      try {
        const storedToken = tokenService.getToken()

        if (!storedToken) {
          clearSession()
          return false
        }

        token.value = storedToken
        user.value = null

        await fetchCurrentUser()
        return isAuthenticated.value
      } catch {
        clearSession()
        return false
      } finally {
        isInitializing.value = false
        sessionInitialized.value = true
      }
    })()

    try {
      return await initializationPromise
    } finally {
      initializationPromise = null
    }
  }

  async function login(credentials: LoginCredentials): Promise<AuthUser | null> {
    if (isAuthenticating.value) return null

    isAuthenticating.value = true
    let receivedToken = false

    try {
      const response = await authService.login(credentials)
      const { access_token: accessToken } = response.data

      if (!accessToken) {
        throw new Error('El servidor no devolvió el token de autenticación.')
      }

      receivedToken = true
      persistToken(accessToken)

      await fetchCurrentUser()
      sessionInitialized.value = true

      return currentUser.value
    } catch (error) {
      if (receivedToken) clearSession()

      throw error
    } finally {
      isAuthenticating.value = false
    }
  }

  async function logout(): Promise<void> {
    if (isLoggingOut.value) return

    isLoggingOut.value = true

    try {
      if (token.value) await authService.logout()
    } catch {
      // La sesión local debe cerrarse aunque el JWT haya expirado o el backend no responda.
    } finally {
      clearSession()
      isLoggingOut.value = false
    }
  }

  function hasRole(role: string): boolean {
    return roles.value.includes(role)
  }

  function hasAnyRole(...roleNames: Array<string | string[]>): boolean {
    return roleNames.flat().some((role) => hasRole(role))
  }

  function hasPermission(permission: string): boolean {
    return isSuperAdmin.value || permissions.value.includes(permission)
  }

  function hasAnyPermission(...permissionNames: Array<string | string[]>): boolean {
    return permissionNames.flat().some((permission) => hasPermission(permission))
  }

  return {
    token,
    user,
    currentUser,
    sessionInitialized,
    isInitializing,
    isAuthenticating,
    isLoggingOut,
    isAuthenticated,
    roles,
    permissions,
    isSuperAdmin,
    login,
    logout,
    fetchCurrentUser,
    initializeSession,
    clearSession,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermission,
  }
})
