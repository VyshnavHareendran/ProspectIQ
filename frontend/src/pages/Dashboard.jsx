import AddBusinessRoundedIcon from '@mui/icons-material/AddBusinessRounded'
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded'
import ScoreRoundedIcon from '@mui/icons-material/ScoreRounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { businessApi } from '../api/businessApi'
import ActivityTimeline from '../components/dashboard/ActivityTimeline'
import QuickActionCard from '../components/dashboard/QuickActionCard'
import RecentBusinessesTable from '../components/dashboard/RecentBusinessesTable'
import StatCard from '../components/dashboard/StatCard'
import WelcomeCard from '../components/dashboard/WelcomeCard'
import useAuth from '../hooks/useAuth'
import { routePaths } from '../routes/routePaths'

const quickActions = [
  {
    title: 'Add Business',
    description: 'Open the business creation workflow.',
    icon: AddBusinessRoundedIcon,
    to: routePaths.businesses,
  },
  {
    title: 'View Businesses',
    description: 'Review and manage business records.',
    icon: BusinessRoundedIcon,
    to: routePaths.businesses,
  },
  {
    title: 'Upload CSV',
    description: 'Navigate to bulk import tools.',
    icon: UploadFileRoundedIcon,
    to: routePaths.upload,
  },
  {
    title: 'Lead Scores',
    description: 'Inspect lead prioritization results.',
    icon: ScoreRoundedIcon,
    to: routePaths.leadScores,
  },
]

const getErrorMessage = (error) => {
  const detail = error.response?.data?.detail

  if (typeof detail === 'string') {
    return detail
  }

  return 'Unable to load recent businesses. Please try again later.'
}

const Dashboard = () => {
  const { user } = useAuth()
  const [now, setNow] = useState(() => new Date())
  const [businessSummary, setBusinessSummary] = useState({
    total: 0,
    items: [],
  })
  const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(true)
  const [businessError, setBusinessError] = useState('')

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let isActive = true

    const loadBusinesses = async () => {
      setIsLoadingBusinesses(true)
      setBusinessError('')

      try {
        const response = await businessApi.getBusinesses(
          {
            page: 1,
            page_size: 5,
          },
          {
            signal: controller.signal,
          },
        )

        if (isActive) {
          setBusinessSummary({
            total: response.data?.total ?? 0,
            items: response.data?.items ?? [],
          })
        }
      } catch (error) {
        if (isActive && error.name !== 'CanceledError') {
          setBusinessError(getErrorMessage(error))
          setBusinessSummary({
            total: 0,
            items: [],
          })
        }
      } finally {
        if (isActive) {
          setIsLoadingBusinesses(false)
        }
      }
    }

    loadBusinesses()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [])

  const stats = [
    {
      title: 'Total Businesses',
      value: businessSummary.total.toLocaleString(),
      helperText: 'Live count from businesses API',
      icon: BusinessCenterRoundedIcon,
      loading: isLoadingBusinesses,
    },
    {
      title: 'High Priority Leads',
      value: '—',
      helperText: 'Placeholder until scoring dashboard is approved',
      icon: PriorityHighRoundedIcon,
    },
    {
      title: "Today's Calls",
      value: '—',
      helperText: 'Placeholder until call workflow is approved',
      icon: CallRoundedIcon,
    },
    {
      title: 'New Businesses This Week',
      value: '—',
      helperText: 'Placeholder metric for future reporting',
      icon: AddBusinessRoundedIcon,
    },
  ]

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

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <RecentBusinessesTable
            businesses={businessSummary.items}
            error={businessError}
            loading={isLoadingBusinesses}
          />
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <ActivityTimeline />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Dashboard
