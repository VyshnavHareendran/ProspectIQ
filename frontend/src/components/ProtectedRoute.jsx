import { Box, CircularProgress } from '@mui/material'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { routePaths } from '../routes/routePaths'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { user, isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) {
    return (
      <Box
        role="status"
        aria-label="Restoring your session"
        sx={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}
      >
        <CircularProgress size={28} thickness={4} />
      </Box>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={routePaths.login} replace state={{ from: location }} />
    )
  }

  if (
    user?.must_change_password &&
    location.pathname !== routePaths.changePassword
  ) {
    return (
      <Navigate
        to={routePaths.changePassword}
        replace
      />
    )
  }

  return children ?? <Outlet />
}

export default ProtectedRoute
