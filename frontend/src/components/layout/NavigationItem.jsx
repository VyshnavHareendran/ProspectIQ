import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NavigationItem = ({
  collapsed = false,
  icon: Icon,
  isActive = false,
  isDestructive = false,
  label,
  onClick,
  path,
}) => {
  const linkProps = path
    ? { component: RouterLink, to: path }
    : { component: 'button' }

  return (
    <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
      <Tooltip
        arrow
        disableInteractive
        placement="right"
        title={collapsed ? label : ''}
      >
        <ListItemButton
          {...linkProps}
          aria-current={isActive ? 'page' : undefined}
          onClick={onClick}
          sx={{
            position: 'relative',
            minHeight: 48,
            justifyContent: collapsed ? 'center' : 'flex-start',
            px: collapsed ? 1.5 : 1.75,
            overflow: 'hidden',
            color: isActive
              ? 'common.white'
              : isDestructive
                ? '#FCA5A5'
                : 'rgba(226, 232, 240, 0.72)',
            borderRadius: 2,
            backgroundColor: isActive
              ? 'rgba(255, 255, 255, 0.1)'
              : 'transparent',
            '&::before': isActive
              ? {
                  position: 'absolute',
                  top: 10,
                  bottom: 10,
                  left: 0,
                  width: 3,
                  content: '""',
                  borderRadius: '0 3px 3px 0',
                  backgroundColor: '#F0A9CB',
                }
              : undefined,
            '&:hover': {
              color: isDestructive ? '#FECACA' : 'common.white',
              backgroundColor: isDestructive
                ? 'rgba(239, 68, 68, 0.1)'
                : 'rgba(255, 255, 255, 0.07)',
              transform: 'translateX(2px)',
            },
            '&.Mui-focusVisible': {
              outline: '2px solid rgba(240, 169, 203, 0.8)',
              outlineOffset: -2,
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: collapsed ? 0 : 1.5,
              justifyContent: 'center',
              color: 'inherit',
            }}
          >
            <Icon sx={{ fontSize: 20 }} />
          </ListItemIcon>

          <ListItemText
            primary={label}
            sx={{
              m: 0,
              opacity: collapsed ? 0 : 1,
              whiteSpace: 'nowrap',
              transition: 'opacity 150ms ease',
              '& .MuiListItemText-primary': {
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 500,
              },
            }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  )
}

export default NavigationItem
