import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import React from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const normalizeStatus = (item) => ({
  status: item.status || 'Unknown',
  count: Number(item.count ?? 0),
})

const EmptyState = () => (
  <Box
    sx={(theme) => ({
      display: 'grid',
      minHeight: 260,
      placeItems: 'center',
      border: `1px dashed ${theme.palette.divider}`,
      borderRadius: 2,
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
      textAlign: 'center',
    })}
  >
    <Stack alignItems="center" spacing={1}>
      <AssignmentTurnedInRoundedIcon color="action" />
      <Typography fontWeight={700}>
        No assignments found
      </Typography>

      <Typography
        color="text.secondary"
        variant="body2"
      >
        Lead assignment status will appear here.
      </Typography>
    </Stack>
  </Box>
)

const LeadAssignmentStatusChart = ({
  data = [],
  loading = false,
  error = '',
}) => {

  const theme = useTheme()

  const chartData = data
    .map(normalizeStatus)
    .filter(item => item.count > 0)

  const colors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
  ]

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>

        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">
            Lead Assignment Status
          </Typography>

          <Typography
            color="text.secondary"
            variant="body2"
          >
            Current distribution of assigned leads.
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {loading ? (
          <Skeleton
            height={280}
            variant="rounded"
          />
        ) : !error && chartData.length === 0 ? (
          <EmptyState />
        ) : null}

        {!loading &&
          !error &&
          chartData.length > 0 && (
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={2}
                    label={({ status, percent }) =>
                      `${status} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={entry.status}
                        fill={
                          colors[index % colors.length]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend iconType="circle" />

                </PieChart>
              </ResponsiveContainer>
            </Box>
          )}
      </CardContent>
    </Card>
  )
}

export default React.memo(LeadAssignmentStatusChart)