const TOKEN_KEY = 'access_token'
const LEGACY_USER_KEY = 'auth_user'

export const tokenService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY)
  },

  removeLegacyUser(): void {
    localStorage.removeItem(LEGACY_USER_KEY)
  },

  clear(): void {
    this.removeToken()
    this.removeLegacyUser()
  },
}
