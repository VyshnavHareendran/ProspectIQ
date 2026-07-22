import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ScoreRoundedIcon from '@mui/icons-material/ScoreRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { routePaths } from '../../routes/routePaths'
import AssignmentTurnedInRounded from "@mui/icons-material/AssignmentTurnedInRounded";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

export const adminNavigationItems = Object.freeze([
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
    label: 'Lead Assignments',
    path: routePaths.leadAssignments,
    icon: AssignmentIndRoundedIcon,
  },
  {
    label: "Employee Management",
    path: routePaths.employeeManagement,
    icon: GroupRoundedIcon,
  },
  {
    label: "Follow-ups",
    path: routePaths.followups,
    icon: AssignmentTurnedInRounded,
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

export const employeeNavigationItems = Object.freeze([
  {
    label: "Dashboard",
    path: routePaths.employeeDashboard,
    icon: DashboardRoundedIcon,
  },
  {
    label: "Today's Calls",
    path: routePaths.employeeTodaysCalls,
    icon: PhoneInTalkRoundedIcon,
  },
  {
    label: "My Leads",
    path: routePaths.employeeMyLeads,
    icon: BusinessRoundedIcon,
  },
  {
    label: "My Call Logs",
    path: routePaths.employeeMyCallLogs,
    icon: CallRoundedIcon,
  },
  {
    label: "My Follow-ups",
    path: routePaths.employeeMyFollowups,
    icon: EventRepeatIcon,
  },
  {
    label: "Profile",
    path: routePaths.employeeProfile,
    icon: PersonRoundedIcon,
  },
  {
    label: "Settings",
    path: routePaths.employeeSettings,
    icon: SettingsRoundedIcon,
  },
]);

export const getNavigationItem = (pathname, navigationItems) =>
  navigationItems.find(({ path }) =>
    path === pathname || pathname.startsWith(`${path}/`)
  );