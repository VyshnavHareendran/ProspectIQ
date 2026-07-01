import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ScoreRoundedIcon from '@mui/icons-material/ScoreRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { routePaths } from '../../routes/routePaths'

export const navigationItems = Object.freeze([
  {
    label: 'Dashboard',
    path: routePaths.dashboard,
    icon: DashboardRoundedIcon,
  },
  {
    label: 'Businesses',
    path: routePaths.businesses,
    icon: BusinessRoundedIcon,
  },
  {
    label: 'Upload CSV',
    path: routePaths.upload,
    icon: UploadFileRoundedIcon,
  },
  {
    label: 'Call Logs',
    path: routePaths.callLogs,
    icon: CallRoundedIcon,
  },
  {
    label: 'Lead Scores',
    path: routePaths.leadScores,
    icon: ScoreRoundedIcon,
  },
  {
    label: 'Reports',
    path: routePaths.reports,
    icon: BarChartRoundedIcon,
  },
  {
    label: 'Settings',
    path: routePaths.settings,
    icon: SettingsRoundedIcon,
  },
])

export const getNavigationItem = (pathname) =>
  navigationItems.find(({ path }) =>
    path === routePaths.dashboard
      ? pathname === path
      : pathname === path || pathname.startsWith(`${path}/`),
  )
