import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import TopNavbar from '../components/layout/TopNavbar'
import { getNavigationItem } from '../components/layout/navigationConfig'
import useAuth from '../hooks/useAuth'
import { routePaths } from '../routes/routePaths'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const DashboardLayout = ({ children }) => {
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const currentItem = getNavigationItem(location.pathname)
  const pageTitle = currentItem?.label || 'Dashboard'
  const sidebarVariant = isDesktop
    ? 'permanent'
    : isMobile
      ? 'temporary'
      : 'persistent'

  const handleMenuClick = () => {
    setIsDrawerOpen((open) => !open)
  }

  const handleLogout = () => {
    logout()
    navigate(routePaths.login, { replace: true })
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Sidebar
        collapsed={isDesktop && isDesktopCollapsed}
        open={isDesktop || isDrawerOpen}
        variant={sidebarVariant}
        onClose={() => setIsDrawerOpen(false)}
        onCollapseToggle={() => setIsDesktopCollapsed((collapsed) => !collapsed)}
        onLogout={handleLogout}
        onNavigate={() => {
          if (!isDesktop) {
            setIsDrawerOpen(false)
          }
        }}
      />

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <TopNavbar
          pageTitle={pageTitle}
          user={user}
          onLogout={handleLogout}
          onMenuClick={handleMenuClick}
        />

        <Box
          component="main"
          sx={{
            width: '100%',
            maxWidth: 1600,
            mx: 'auto',
            px: { xs: 2, sm: 3, lg: 4 },
            py: { xs: 3, sm: 4 },
          }}
        >
          <Stack
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
  sx={{
    mb: 3,
  }}
>
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{
      fontWeight: 500,
    }}
  >
    {dateFormatter.format(new Date())}
  </Typography>
</Stack>
          <Box sx={{ mt: { xs: 3, sm: 4 } }}>{children ?? <Outlet />}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardLayout
