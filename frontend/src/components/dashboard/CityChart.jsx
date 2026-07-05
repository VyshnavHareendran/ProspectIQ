import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded'
import { Alert, Box, Card, CardContent, Skeleton, Stack, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const normalizeCity = (item) => ({
  city: item.city || item.name || 'Unknown',
  count: Number(item.count ?? item.total ?? item.value ?? 0),
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
      <LocationCityRoundedIcon color="action" />
      <Typography fontWeight={700}>No city data</Typography>
      <Typography color="text.secondary" variant="body2">
        City distribution will appear after businesses are imported.
      </Typography>
    </Stack>
  </Box>
)

const CityChart = ({ data = [], loading = false, error = '' }) => {
  const theme = useTheme()
  const chartData = data.map(normalizeCity).filter((item) => item.count > 0)

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">City Distribution</Typography>
          <Typography color="text.secondary" variant="body2">
            Business concentration by city.
          </Typography>
        </Stack>

        {error ? <Alert severity="error">{error}</Alert> : null}

        {loading ? (
          <Skeleton height={280} variant="rounded" />
        ) : !error && chartData.length === 0 ? (
          <EmptyState />
        ) : null}

        {!loading && !error && chartData.length > 0 ? (
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid horizontal={false} stroke={theme.palette.divider} />
                <XAxis allowDecimals={false} tickLine={false} type="number" />
                <YAxis
                  dataKey="city"
                  tickLine={false}
                  type="category"
                  width={104}
                />
                <Tooltip
                  cursor={{ fill: alpha(theme.palette.primary.main, 0.08) }}
                />
                <Bar
                  dataKey="count"
                  fill={theme.palette.primary.main}
                  name="Businesses"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default React.memo(CityChart)
