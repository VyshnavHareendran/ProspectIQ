import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded'
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
        <Box
          sx={{
            alignItems: 'center',
            display: 'grid',
            gridTemplateColumns: collapsed ? '1fr' : 'minmax(0, 1fr) 38px',
            columnGap: 1.25,
            minHeight: 82,
            px: collapsed ? 1 : 1.75,
            py: 1.25,
          }}
        >
          <BrandMark
            showWordmark={!collapsed}
            textColor="common.white"
            logoSize={collapsed ? 50 : 48}
            wordmarkSx={{
              fontSize: '1.2rem',
            }}
          />

          {variant === 'permanent' && !collapsed && (
            <Tooltip title="Collapse sidebar">
              <IconButton
                size="small"
                aria-label="Collapse sidebar"
                onClick={onCollapseToggle}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  border: "1px solid rgba(148,163,184,.18)",
                  justifySelf: 'end',

                  color: "rgba(226,232,240,.72)",

                  transition: "all .25s ease",

                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,.10)",
                    borderColor: "rgba(226,232,240,.28)",
                    color: "#fff",
                  },
                }}
              >
                <ViewSidebarRoundedIcon sx={{ fontSize: 21 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {variant === 'permanent' && collapsed && (
          <Tooltip title="Expand sidebar" placement="right">
            <IconButton
              size="small"
              aria-label="Expand sidebar"
              onClick={onCollapseToggle}
              sx={{
                display: "flex",
                width: 38,
                height: 38,
                mx: "auto",
                mt: -0.5,
                mb: 1.5,
                borderRadius: "50%",
                border: "1px solid rgba(148,163,184,.18)",
                color: "rgba(226,232,240,0.72)",

                transition: "all .25s ease",

                "&:hover": {
                  backgroundColor: "rgba(255,255,255,.10)",
                  borderColor: "rgba(226,232,240,.28)",
                  color: "#fff",
                },
              }}
            >
              <ViewSidebarRoundedIcon sx={{ fontSize: 21 }} />
            </IconButton>
          </Tooltip>
        )}

        <Box
          component="nav"
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            px: 1.5,

            // Firefox
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.18) transparent",

            // Chrome, Edge, Brave
            "&::-webkit-scrollbar": {
              width: "6px",
            },

            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },

            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255,255,255,0.18)",
              borderRadius: "20px",
            },

            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(255,255,255,0.30)",
            },
          }}
        >
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
