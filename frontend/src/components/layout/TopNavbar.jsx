import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import Breadcrumbs from './Breadcrumbs'
import UserMenu from './UserMenu'

const TopNavbar = ({ onMenuClick, onLogout, pageTitle, user }) => (
  <Paper
    component="header"
    square
    elevation={0}
    sx={{
      position: 'sticky',
      top: 0,
      zIndex: 'appBar',
      display: 'flex',
      minHeight: 72,
      alignItems: 'center',
      px: { xs: 2, sm: 3 },
      borderBottom: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(14px)',
    }}
  >
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ width: '100%' }}>
      <IconButton
        aria-label="Toggle navigation"
        onClick={onMenuClick}
        sx={{ display: { lg: 'none' }, color: 'text.secondary' }}
      >
        <MenuRoundedIcon />
      </IconButton>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          component="h1"
          noWrap
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
              md: "1.25rem",
            },
            fontWeight: 600,
          }}
        >
          {pageTitle}
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Breadcrumbs />
        </Box>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
        sx={{ flex: 1, minWidth: 0 }}
      >
        <TextField
          placeholder="Search workspace..."
          aria-label="Search workspace"
          sx={{
            display: {
                xs: "none",
                lg: "block",
            },
            width: { md: 220, lg: 280 },
            '& .MuiOutlinedInput-root': {
              minHeight: 38,
              backgroundColor: 'background.default',
            },
          }}
          slotProps={{
            input: {
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Tooltip title="Notifications">
          <IconButton
              size="small"
              aria-label="Notifications"
              sx={{
                  color: "text.secondary",
              }}
          >
            <Badge color="primary" variant="dot" overlap="circular">
              <NotificationsNoneRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Tooltip>

        <UserMenu user={user} onLogout={onLogout} />
      </Stack>
    </Stack>
  </Paper>
)

export default TopNavbar
