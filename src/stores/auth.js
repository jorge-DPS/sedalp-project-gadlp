import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { authService } from '@/services/authService'
import { tokenService } from '@/services/tokenService'

function normalizeNames(values) {
  if (!values) return []

  const items = Array.isArray(values) ? values : [values]

  return items
    .map((item) => {
      if (typeof item === 'string') return item

      return item?.name ?? item?.slug ?? null
    })
    .filter(Boolean)
}

function extractUser(responseData) {
  const responseBody = responseData?.data ?? responseData
  const responseUser = responseBody?.user ?? responseBody

  if (!responseUser || typeof responseUser !== 'object' || Array.isArray(responseUser)) return null

  if (!responseBody?.user) return responseUser

  return {
    ...responseUser,
    roles: responseUser.roles ?? responseBody.roles,
    permissions: responseUser.permissions ?? responseBody.permissions,
  }
}

export const useAuthStore = defineStore('auth', () => {
  tokenService.removeLegacyUser()

  const token = ref(tokenService.getToken())
  const user = ref(null)
  const sessionInitialized = ref(false)
  const isInitializing = ref(false)
  const isAuthenticating = ref(false)
  const isLoggingOut = ref(false)

  let initializationPromise = null

  const currentUser = computed(() => user.value)
  const isAuthenticated = computed(() => Boolean(token.value && user.value))

  const roles = computed(() => {
    const roleNames = [...normalizeNames(user.value?.roles), ...normalizeNames(user.value?.role)]

    return [...new Set(roleNames)]
  })

  const permissions = computed(() => {
    const directPermissions = normalizeNames(user.value?.permissions)
    const rolePermissions = (Array.isArray(user.value?.roles) ? user.value.roles : []).flatMap(
      (role) => normalizeNames(role?.permissions),
    )

    return [...new Set([...directPermissions, ...rolePermissions])]
  })

  function persistToken(value) {
    token.value = value

    if (value) tokenService.setToken(value)
    else tokenService.removeToken()
  }

  function persistUser(value) {
    user.value = value
  }

  function clearSession() {
    token.value = null
    user.value = null
    sessionInitialized.value = true
    tokenService.clear()
  }

  async function fetchCurrentUser() {
    if (!token.value) {
      persistUser(null)
      return null
    }

    const response = await authService.me()
    const currentUserData = extractUser(response.data)

    if (!currentUserData) {
      throw new Error('El servidor no devolvió un usuario autenticado válido.')
    }

    persistUser(currentUserData)

    return currentUserData
  }

  async function initializeSession() {
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

  async function login(credentials) {
    if (isAuthenticating.value) return null

    isAuthenticating.value = true
    let receivedToken = false

    try {
      const response = await authService.login(credentials)
      const { access_token: accessToken, user: loginUser } = response.data ?? {}

      if (!accessToken) {
        throw new Error('El servidor no devolvió el token de autenticación.')
      }

      receivedToken = true
      persistToken(accessToken)

      if (loginUser) persistUser(loginUser)

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

  async function logout() {
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

  function hasRole(role) {
    return roles.value.includes(role)
  }

  function hasAnyRole(...roleNames) {
    return roleNames.flat().some((role) => hasRole(role))
  }

  function hasPermission(permission) {
    return permissions.value.includes(permission)
  }

  function hasAnyPermission(...permissionNames) {
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
