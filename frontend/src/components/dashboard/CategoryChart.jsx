import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
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
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const MAX_VISIBLE_CATEGORIES = 7

const normalizeCategory = (item) => ({
  category: item.category || item.name || 'Uncategorized',
  count: Number(item.count ?? item.total ?? item.value ?? 0),
})

const prepareChartData = (data) => {
  const sorted = data
    .map(normalizeCategory)
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)

  if (sorted.length <= MAX_VISIBLE_CATEGORIES) {
    return sorted
  }

  const visibleCategories = sorted.slice(0, MAX_VISIBLE_CATEGORIES)

  const remainingCount = sorted
    .slice(MAX_VISIBLE_CATEGORIES)
    .reduce((total, item) => total + item.count, 0)

  return [
    ...visibleCategories,
    {
      category: 'Others',
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
      <CategoryRoundedIcon color="action" />

      <Typography fontWeight={700}>
        No category data
      </Typography>

      <Typography color="text.secondary" variant="body2">
        Category mix will appear after businesses are categorized.
      </Typography>
    </Stack>
  </Box>
)

const CategoryChart = ({ data = [], loading = false, error = '' }) => {
  const theme = useTheme()

  const normalizedData = data
    .map(normalizeCategory)
    .filter((item) => item.count > 0)

  const totalCategories = normalizedData.length
  const chartData = prepareChartData(data)

  const totalBusinesses = chartData.reduce(
    (total, item) => total + item.count,
    0
  )

  const colors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.primary.light,
    theme.palette.success.light,
    theme.palette.warning.light,
    theme.palette.grey[500],
  ]

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">
            Category Distribution
          </Typography>

          <Typography color="text.secondary" variant="body2">
            Segmentation by business category.
          </Typography>

          {totalCategories > MAX_VISIBLE_CATEGORIES ? (
            <Typography color="text.secondary" variant="caption">
              Showing top {MAX_VISIBLE_CATEGORIES} of {totalCategories} categories.
              Remaining categories are grouped as Others.
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
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              alignItems: 'center',
              gap: 2,
              minHeight: 340,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: '100%',
                  sm: '55%',
                },
                height: 280,
                minWidth: 0,
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="category"
                    innerRadius="52%"
                    outerRadius="78%"
                    paddingAngle={2}
                    stroke={theme.palette.background.paper}
                    strokeWidth={2}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        fill={colors[index % colors.length]}
                        key={entry.category}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => {
                      const percentage = totalBusinesses
                        ? ((Number(value) / totalBusinesses) * 100).toFixed(1)
                        : 0

                      return [
                        `${value} (${percentage}%)`,
                        name,
                      ]
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Stack
              spacing={1}
              sx={{
                width: {
                  xs: '100%',
                  sm: '45%',
                },
                minWidth: 0,
              }}
            >
              {chartData.map((item, index) => {
                const percentage = totalBusinesses
                  ? ((item.count / totalBusinesses) * 100).toFixed(1)
                  : 0

                return (
                  <Stack
                    key={item.category}
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ minWidth: 0 }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        flexShrink: 0,
                        backgroundColor:
                          colors[index % colors.length],
                      }}
                    />

                    <Typography
                      variant="body2"
                      noWrap
                      title={item.category}
                      sx={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {item.category}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ flexShrink: 0 }}
                    >
                      {item.count} ({percentage}%)
                    </Typography>
                  </Stack>
                )
              })}
            </Stack>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default React.memo(CategoryChart)