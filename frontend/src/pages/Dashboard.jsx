import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded'
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded'
import ScoreRoundedIcon from '@mui/icons-material/ScoreRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { Grid, Stack, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { dashboardApi } from '../api/dashboardApi'
import ActivityTimeline from '../components/dashboard/ActivityTimeline'
import CategoryChart from '../components/dashboard/CategoryChart'
import CityChart from '../components/dashboard/CityChart'
import ImportSummaryCard from '../components/dashboard/ImportSummaryCard'
import QuickActionCard from '../components/dashboard/QuickActionCard'
import RecentBusinessesTable from '../components/dashboard/RecentBusinessesTable'
import RecentUploads from '../components/dashboard/RecentUploads'
import StatCard from '../components/dashboard/StatCard'
import TopRatedBusinesses from '../components/dashboard/TopRatedBusinesses'
import WelcomeCard from '../components/dashboard/WelcomeCard'
import useAuth from '../hooks/useAuth'
import { routePaths } from '../routes/routePaths'

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

const getReviewCount = (business) =>
  business.review_count ?? business.google_review_count ?? business.reviews_count ?? 0

const Dashboard = () => {
  const { user } = useAuth()
  const [now, setNow] = useState(() => new Date())
  const [summary, setSummary] = useState(null)
  const [recentBusinesses, setRecentBusinesses] = useState([])
  const [importSummary, setImportSummary] = useState(null)
  const [cityData, setCityData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [dashboardError, setDashboardError] = useState('')

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
        const [summaryRes, recentRes, importRes, cityRes, categoryRes] =
          await Promise.all([
            dashboardApi.getSummary(),
            dashboardApi.getRecentBusinesses(),
            dashboardApi.getImportSummary(),
            dashboardApi.getCityDistribution(),
            dashboardApi.getCategoryDistribution(),
          ])
        if (!isActive) return
        setSummary(summaryRes.data)
        setRecentBusinesses(getItems(recentRes.data))
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

  const topBusinesses = useMemo(
    () =>
      [...recentBusinesses]
        .filter((business) => Number(business.google_rating ?? business.rating ?? 0) > 0)
        .sort((first, second) => {
          const ratingDiff =
            Number(second.google_rating ?? second.rating ?? 0) -
            Number(first.google_rating ?? first.rating ?? 0)
          return ratingDiff || getReviewCount(second) - getReviewCount(first)
        }),
    [recentBusinesses],
  )

  const recentUploads = useMemo(
    () => getItems(importSummary?.recent_uploads || importSummary?.uploads),
    [importSummary],
  )

  const stats = [
    ['Total Businesses', summary?.total_businesses ?? 0, 'Live count of businesses.', BusinessCenterRoundedIcon],
    ['High Priority Leads', summary?.high_priority_leads ?? 0, 'Leads requiring attention.', PriorityHighRoundedIcon],
    ["Today's Calls", summary?.todays_calls ?? summary?.today_calls ?? 0, 'Calls scheduled for today.', CallRoundedIcon],
    ['New Businesses This Week', summary?.new_businesses_this_week ?? 0, 'New records added this week.', AddBusinessRoundedIcon],
  ].map(([title, value, helperText, icon]) => ({ title, value, helperText, icon, loading }))

  return (
    <Stack spacing={3}>
      <WelcomeCard now={now} user={user} />
      <Grid container spacing={2.5}>
        {stats.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
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
      <Grid container spacing={2.5} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 7 }}>
          <CityChart data={cityData} error={dashboardError} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <CategoryChart data={categoryData} error={dashboardError} loading={loading} />
        </Grid>
      </Grid>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <RecentBusinessesTable businesses={recentBusinesses} error={dashboardError} loading={loading} />
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <ActivityTimeline />
        </Grid>
      </Grid>
      <Grid container spacing={2.5} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 6 }}>
          <ImportSummaryCard error={dashboardError} loading={loading} summary={importSummary} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TopRatedBusinesses businesses={topBusinesses} loading={loading} />
        </Grid>
      </Grid>
      <RecentUploads loading={loading} uploads={recentUploads} />
    </Stack>
  )
}

export default Dashboard
