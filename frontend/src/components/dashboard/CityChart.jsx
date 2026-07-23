import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded'
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
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const MAX_VISIBLE_CITIES = 8

const normalizeCity = (item) => ({
  city: item.city || item.name || 'Unknown',
  count: Number(item.count ?? item.total ?? item.value ?? 0),
})

const prepareChartData = (data) => {
  const sorted = data
    .map(normalizeCity)
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)

  if (sorted.length <= MAX_VISIBLE_CITIES) {
    return sorted
  }

  const visibleCities = sorted.slice(0, MAX_VISIBLE_CITIES)

  const remainingCount = sorted
    .slice(MAX_VISIBLE_CITIES)
    .reduce((total, item) => total + item.count, 0)

  return [
    ...visibleCities,
    {
      city: 'Others',
      count: remainingCount,
    },
  ]
}

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

      <Typography fontWeight={700}>
        No city data
      </Typography>

      <Typography color="text.secondary" variant="body2">
        City distribution will appear after businesses are imported.
      </Typography>
    </Stack>
  </Box>
)

const CityChart = ({ data = [], loading = false, error = '' }) => {
  const theme = useTheme()

  const totalCities = data
    .map(normalizeCity)
    .filter((item) => item.count > 0).length

  const chartData = prepareChartData(data)

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">
            City Distribution
          </Typography>

          <Typography color="text.secondary" variant="body2">
            Business concentration by city.
          </Typography>

          {totalCities > MAX_VISIBLE_CITIES ? (
            <Typography color="text.secondary" variant="caption">
              Showing top {MAX_VISIBLE_CITIES} of {totalCities} cities. Remaining cities are grouped as Others.
            </Typography>
          ) : null}
        </Stack>

        {error ? (
          <Alert severity="error">
            {error}
          </Alert>
        ) : null}

        {loading ? (
          <Skeleton height={320} variant="rounded" />
        ) : !error && chartData.length === 0 ? (
          <EmptyState />
        ) : null}

        {!loading && !error && chartData.length > 0 ? (
          <Box
            sx={{
              width: '100%',
              height: {
                xs: 320,
                sm: 340,
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  top: 4,
                  right: 24,
                  bottom: 4,
                  left: 8,
                }}
              >
                <CartesianGrid
                  horizontal={false}
                  stroke={theme.palette.divider}
                  strokeDasharray="3 3"
                />

                <XAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  type="number"
                />

                <YAxis
                  axisLine={false}
                  dataKey="city"
                  tickLine={false}
                  type="category"
                  width={110}
                  tick={{
                    fill: theme.palette.text.secondary,
                    fontSize: 13,
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: alpha(theme.palette.primary.main, 0.06),
                  }}
                  formatter={(value) => [value, 'Businesses']}
                />

                <Bar
                  dataKey="count"
                  fill={theme.palette.primary.main}
                  name="Businesses"
                  radius={[0, 8, 8, 0]}
                  maxBarSize={28}
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