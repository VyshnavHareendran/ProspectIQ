import { useCallback, useEffect, useMemo, useState } from 'react'
import { authApi } from '../api'
import { authStorage } from '../utils/authStorage'
import AuthContext from './AuthContext'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    let isActive = true

    const restoreSession = async () => {
      if (!authStorage.getToken()) {
        setIsInitializing(false)
        return
      }

      try {
        const response = await authApi.getCurrentUser({
          signal: controller.signal,
        })

        if (isActive) {
          setUser(response.data)
        }
      } catch {
        if (isActive) {
          setUser(null)
        }
      } finally {
        if (isActive) {
          setIsInitializing(false)
        }
      }
    }

    restoreSession()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const loginResponse = await authApi.login(credentials)
    authStorage.setToken(loginResponse.data.access_token)

    try {
      const userResponse = await authApi.getCurrentUser()
      setUser(userResponse.data)
      return userResponse.data
    } catch (error) {
      authStorage.clearToken()
      setUser(null)
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    authStorage.clearToken()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      logout,
    }),
    [isInitializing, login, logout, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
