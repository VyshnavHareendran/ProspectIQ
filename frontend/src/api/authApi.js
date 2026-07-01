import httpClient from './httpClient'

export const authApi = {
  login(credentials) {
    return httpClient.post('/auth/login', credentials)
  },
  getCurrentUser(config = {}) {
    return httpClient.get('/auth/me', config)
  },
}
