import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded'
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useLocation } from 'react-router-dom'
import BrandMark from '../brand/BrandMark'
import NavigationItem from './NavigationItem'
import { getNavigationItem } from "./navigationConfig";

export const SIDEBAR_WIDTH = 264
export const SIDEBAR_COLLAPSED_WIDTH = 80

const Sidebar = ({
  navigationItems,
  collapsed,
  onClose,
  onCollapseToggle,
  onLogout,
  onNavigate,
  open,
  variant,
}) => {
  const location = useLocation()
  
  const activeItem = getNavigationItem(
    location.pathname,
    navigationItems
  );
  const width = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH
  const isTemporary = variant === 'temporary'

  return (
    <Drawer
      open={open}
      variant={variant}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      slotProps={{
        paper: {
          component: 'aside',
          'aria-label': 'Primary navigation',
        },
      }}
      sx={{
        width: isTemporary ? 0 : open ? width : 0,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        '& .MuiDrawer-paper': {
          width: isTemporary ? SIDEBAR_WIDTH : width,
          overflowX: 'hidden',
          color: 'common.white',
          border: 0,
          backgroundColor: '#0F172A',
          backgroundImage:
            'radial-gradient(circle at 20% 0%, rgba(124, 45, 90, 0.22), transparent 34%)',
          boxShadow: isTemporary
            ? '18px 0 48px rgba(15, 23, 42, 0.22)'
            : 'none',
          transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
      }}
    >
      <Stack sx={{ height: '100dvh', minHeight: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={collapsed ? 'center' : 'space-between'}
          sx={{ minHeight: 72, px: collapsed ? 2 : 2.5 }}
        >
          <BrandMark showWordmark={!collapsed} textColor="common.white" />

          {variant === 'permanent' && !collapsed && (
            <Tooltip title="Collapse sidebar">
              <IconButton
                size="small"
                aria-label="Collapse sidebar"
                onClick={onCollapseToggle}
                sx={{
                  color: 'rgba(226, 232, 240, 0.64)',
                  '&:hover': {
                    color: 'common.white',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        {variant === 'permanent' && collapsed && (
          <Tooltip title="Expand sidebar" placement="right">
            <IconButton
              size="small"
              aria-label="Expand sidebar"
              onClick={onCollapseToggle}
              sx={{
                mx: 'auto',
                mb: 1,
                color: 'rgba(226, 232, 240, 0.64)',
                '&:hover': {
                  color: 'common.white',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        <Box component="nav" sx={{ flex: 1, minHeight: 0, overflowY: 'auto', px: 1.5 }}>
          {!collapsed && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                px: 1.5,
                pt: 1,
                pb: 1.25,
                color: 'rgba(148, 163, 184, 0.64)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Workspace
            </Typography>
          )}

          <List disablePadding>
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.path}
                {...item}
                collapsed={collapsed}
                isActive={activeItem?.path === item.path}
                onClick={onNavigate}
              />
            ))}
          </List>
        </Box>

        <Box sx={{ p: 1.5 }}>
          <Divider sx={{ mb: 1.5, borderColor: 'rgba(148, 163, 184, 0.14)' }} />
          <List disablePadding>
            <NavigationItem
              collapsed={collapsed}
              icon={LogoutRoundedIcon}
              isDestructive
              label="Logout"
              onClick={onLogout}
            />
          </List>
        </Box>
      </Stack>
    </Drawer>
  )
}

export default Sidebar
