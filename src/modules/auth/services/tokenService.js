const TOKEN_KEY = 'access_token'
const USER_KEY = 'auth_user'

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

  getUser() {
    const user = localStorage.getItem(USER_KEY)

    if (!user) {
      return null
    }

    try {
      return JSON.parse(user)
    } catch {
      return null
    }
  },

  setUser(user) {
    localStorage.setItem(
      USER_KEY,
      JSON.stringify(user),
    )
  },

  removeUser() {
    localStorage.removeItem(USER_KEY)
  },

  isAuthenticated() {
    return Boolean(this.getToken())
  },

  clear() {
    this.removeToken()
    this.removeUser()
  },
}