import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import {
  Avatar,
  Box,
  ButtonBase,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '../../routes/routePaths'

const getInitials = (name = '') => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return initials.toUpperCase() || 'U'
}

const UserMenu = ({ onLogout, user }) => {
  const navigate = useNavigate()
  const [anchorElement, setAnchorElement] = useState(null)
  const isOpen = Boolean(anchorElement)
  const displayName = user?.full_name || 'Account'

  const closeMenu = () => setAnchorElement(null)

  const openSettings = () => {
    closeMenu()

    navigate(
      user?.role === "ADMIN"
        ? routePaths.settings
        : routePaths.employeeSettings
    )
  }

  const openProfile = () => {
    closeMenu();

    navigate(
      user?.role === "ADMIN"
        ? routePaths.profile
        : routePaths.employeeProfile
    );
  };

  const handleLogout = () => {
    closeMenu()
    onLogout()
  }

  return (
    <>
      <ButtonBase
        aria-controls={isOpen ? 'user-menu' : undefined}
        aria-expanded={isOpen ? 'true' : undefined}
        aria-haspopup="menu"
        onClick={(event) => setAnchorElement(event.currentTarget)}
        sx={{
          p: 0.5,
          borderRadius: 2,
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: 'primary.main',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
          >
            {getInitials(displayName)}
          </Avatar>

          <Stack
            spacing={0.25}
            alignItems="flex-start"
            sx={{ display: { xs: 'none', sm: 'flex' }, minWidth: {sm:112, md:130} }}
          >
            <Typography
              variant="body2"
              fontWeight={650}
              noWrap
              sx={{ maxWidth: 152, lineHeight: 1.2 }}
            >
              {displayName}
            </Typography>
            {user?.role && (
              <Box
                component="span"
                sx={{
                  px: 0.75,
                  py: 0.125,
                  color: 'primary.main',
                  borderRadius: 10,
                  backgroundColor: 'primary.50',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  lineHeight: 1.5,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {user.role}
              </Box>
            )}
          </Stack>
        </Stack>
      </ButtonBase>

      <Menu
        id="user-menu"
        anchorEl={anchorElement}
        open={isOpen}
        onClose={closeMenu}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 220,
              mt: 1,
              p: 0.75,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
            },
          },
        }}
      >
        <MenuItem onClick={openProfile} sx={{ borderRadius: 1.5 }}>
          <ListItemIcon>
            <AccountCircleRoundedIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={openSettings} sx={{ borderRadius: 1.5 }}>
          <ListItemIcon>
            <SettingsRoundedIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider sx={{ my: 0.75 }} />
        <MenuItem
          onClick={handleLogout}
          sx={{ color: 'error.main', borderRadius: 1.5 }}
        >
          <ListItemIcon sx={{ color: 'error.main' }}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
