import axios from 'axios'
import { routePaths } from '../routes/routePaths'
import { authStorage } from '../utils/authStorage'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
  },
})

httpClient.interceptors.request.use((config) => {
  const token = authStorage.getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.clearToken()

      if (window.location.pathname !== routePaths.login) {
        window.location.replace(routePaths.login)
      }
    }

    return Promise.reject(error)
  },
)

export default httpClient
