import { STORAGE_KEYS } from '../constants/storage'

export const authStorage = {
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.accessToken)
  },
  setToken(token) {
    localStorage.setItem(STORAGE_KEYS.accessToken, token)
  },
  clearToken() {
    localStorage.removeItem(STORAGE_KEYS.accessToken)
  },
}
