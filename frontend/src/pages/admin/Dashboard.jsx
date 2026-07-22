import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import ScoreRoundedIcon from '@mui/icons-material/ScoreRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { dashboardApi } from '../../api/admin/dashboardApi'
import CategoryChart from '../../components/dashboard/CategoryChart'
import CityChart from '../../components/dashboard/CityChart'
import ImportSummaryCard from '../../components/dashboard/ImportSummaryCard'
import QuickActionCard from '../../components/dashboard/QuickActionCard'
import RecentBusinessesTable from '../../components/dashboard/RecentBusinessesTable'
import StatCard from '../../components/dashboard/StatCard'
import WelcomeCard from '../../components/dashboard/WelcomeCard'
import useAuth from '../../hooks/useAuth'
import { routePaths } from '../../routes/routePaths'
import UpcomingFollowupsCard from '../../components/dashboard/UpcomingFollowupsCard'
import LeadAssignmentStatusChart from '../../components/dashboard/LeadAssignmentStatusChart'
import RecentCallLogsCard from '../../components/dashboard/RecentCallLogsCard'
import EmployeePerformanceTable from '../../components/dashboard/EmployeePerformanceTable'
import { settingsApi } from "../../api/admin/settingsApi";


const quickActions = [
  ['Add Business', 'Open the business creation workflow.', AddBusinessRoundedIcon, routePaths.businesses],
  ['View Businesses', 'Review and manage business records.', BusinessRoundedIcon, routePaths.businesses],
  ['Upload CSV', 'Navigate to bulk import tools.', UploadFileRoundedIcon, routePaths.upload],
  ['Lead Scores', 'Inspect lead prioritization results.', ScoreRoundedIcon, routePaths.leadScores],
].map(([title, description, icon, to]) => ({ title, description, icon, to }))

const getErrorMessage = (error) => {
  const detail = error.response?.data?.detail
  return typeof detail === 'string'
    ? detail
    : 'Unable to load dashboard data. Please try again later.'
}

const getItems = (value) => {
  if (Array.isArray(value)) return value
  if (Array.isArray(value?.items)) return value.items
  if (Array.isArray(value?.results)) return value.results
  return []
}

const Dashboard = () => {
  const { user } = useAuth()
  const [now, setNow] = useState(() => new Date())
  const [summary, setSummary] = useState(null)
  const [recentBusinesses, setRecentBusinesses] = useState([])
  const [upcomingFollowups, setUpcomingFollowups] = useState([])
  const [assignmentStatus, setAssignmentStatus] = useState([])
  const [recentCalls, setRecentCalls] = useState([])
  const [employeePerformance, setEmployeePerformance] = useState([])
  const [importSummary, setImportSummary] = useState(null)
  const [cityData, setCityData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [dashboardError, setDashboardError] = useState('')

  const [dashboardSettings, setDashboardSettings] = useState({
    recent_activities: true,
    statistics: true,
    charts: true,
    default_landing_page: "dashboard",
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    let isActive = true
    const loadDashboard = async () => {
      setLoading(true)
      setDashboardError('')
      try {
        const [
            summaryRes,
            recentRes,
            importRes,
            cityRes,
            categoryRes,
            followupRes,
            assignmentStatusRes,
            recentCallsRes,
            employeePerformanceRes,
            dashboardSettingsRes,
        ] = await Promise.all([
            dashboardApi.getSummary(),
            dashboardApi.getRecentBusinesses(),
            dashboardApi.getImportSummary(),
            dashboardApi.getCityDistribution(),
            dashboardApi.getCategoryDistribution(),
            dashboardApi.getUpcomingFollowups(),
            dashboardApi.getLeadAssignmentStatus(),
            dashboardApi.getRecentCalls(),
            dashboardApi.getEmployeePerformance(),
            settingsApi.getDashboard(),
        ])
        if (!isActive) return
        setSummary(summaryRes.data)
        setRecentBusinesses(getItems(recentRes.data))
        setUpcomingFollowups(followupRes.data)   // <-- THIS IS MISSING
        setAssignmentStatus(assignmentStatusRes.data)
        setRecentCalls(recentCallsRes.data)
        setEmployeePerformance(employeePerformanceRes.data)
        setDashboardSettings(dashboardSettingsRes.data);
        setImportSummary(importRes.data)
        setCityData(getItems(cityRes.data))
        setCategoryData(getItems(categoryRes.data))

      } catch (error) {
        if (isActive) setDashboardError(getErrorMessage(error))
      } finally {
        if (isActive) setLoading(false)
      }
    }
    loadDashboard()
    return () => {
      isActive = false
    }
  }, [])

  const stats = [
    [
      'Total Businesses',
      summary?.total_businesses ?? 0,
      'Registered businesses',
      BusinessCenterRoundedIcon,
    ],
    [
      'Employees',
      summary?.total_employees ?? 0,
      'Active employees',
      GroupsRoundedIcon,
    ],
    [
      'Lead Assignments',
      summary?.total_assignments ?? 0,
      'Assigned leads',
      AssignmentTurnedInRoundedIcon,
    ],
    [
      'Total Calls',
      summary?.total_calls ?? 0,
      'Calls recorded',
      CallRoundedIcon,
    ],
    [
      "Today's Follow-ups",
      summary?.today_followups ?? 0,
      'Scheduled today',
      EventAvailableRoundedIcon,
    ],
    [
      'Avg Lead Score',
      summary?.average_lead_score ?? 0,
      'Average ML score',
      StarRoundedIcon,
    ],
  ].map(([title, value, helperText, icon]) => ({
    title,
    value,
    helperText,
    icon,
    loading,
  }))

  return (
    <Stack spacing={3}>
      <WelcomeCard now={now} user={user} />
      {dashboardSettings.statistics && (
        <Grid container spacing={2.5}>
          {stats.map((stat) => (
            <Grid
              key={stat.title}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                xl: 2,
              }}
            >
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>
      )}
      <Stack spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="h3">Quick Actions</Typography>
          <Typography color="text.secondary" variant="body2">
            Navigation shortcuts for the next operational workflows.
          </Typography>
        </Stack>
        <Grid container spacing={2.5}>
          {quickActions.map((action) => (
            <Grid key={action.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <QuickActionCard {...action} />
            </Grid>
          ))}
        </Grid>
      </Stack>
      {dashboardSettings.charts && (
        <Grid container spacing={2.5} alignItems="stretch">
          <Grid size={{ xs: 12, lg: 7 }}>
            <CityChart
              data={cityData}
              error={dashboardError}
              loading={loading}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <CategoryChart
              data={categoryData}
              error={dashboardError}
              loading={loading}
            />
          </Grid>
        </Grid>
      )}
      {dashboardSettings.recent_activities && (
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, xl: 8 }}>
            <RecentBusinessesTable
              businesses={recentBusinesses}
              error={dashboardError}
              loading={loading}
            />
          </Grid>

          <Grid size={{ xs: 12, xl: 4 }}>
            <UpcomingFollowupsCard
              followups={upcomingFollowups}
              loading={loading}
              error={dashboardError}
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={2.5}>

        {dashboardSettings.recent_activities && (
          <Grid size={{ xs: 12, lg: 6 }}>
            <ImportSummaryCard
              error={dashboardError}
              loading={loading}
              summary={importSummary}
            />
          </Grid>
        )}

        {dashboardSettings.charts && (
          <Grid size={{ xs: 12, lg: 6 }}>
            <LeadAssignmentStatusChart
              data={assignmentStatus}
              loading={loading}
              error={dashboardError}
            />
          </Grid>
        )}

        {dashboardSettings.recent_activities && (
          <Grid size={{ xs: 12, lg: 4 }}>
            <RecentCallLogsCard
              calls={recentCalls}
              loading={loading}
              error={dashboardError}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, lg: 8 }}>
          <EmployeePerformanceTable
            data={employeePerformance}
            loading={loading}
            error={dashboardError}
          />
        </Grid>

      </Grid>
    </Stack>
  )
}

export default Dashboard
