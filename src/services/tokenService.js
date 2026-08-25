const TOKEN_KEY = 'access_token'
const LEGACY_USER_KEY = 'auth_user'

export const tokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },

  removeLegacyUser() {
    localStorage.removeItem(LEGACY_USER_KEY)
  },

  clear() {
    this.removeToken()
    this.removeLegacyUser()
  },
}
