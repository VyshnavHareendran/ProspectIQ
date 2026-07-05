import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import { Alert, Box, Card, CardContent, Skeleton, Stack, Typography } from '@mui/material'
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

const normalizeCategory = (item) => ({
  category: item.category || item.name || 'Uncategorized',
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
      <CategoryRoundedIcon color="action" />
      <Typography fontWeight={700}>No category data</Typography>
      <Typography color="text.secondary" variant="body2">
        Category mix will appear after businesses are categorized.
      </Typography>
    </Stack>
  </Box>
)

const CategoryChart = ({ data = [], loading = false, error = '' }) => {
  const theme = useTheme()
  const chartData = data.map(normalizeCategory).filter((item) => item.count > 0)
  const colors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.primary.light,
  ]

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">Category Distribution</Typography>
          <Typography color="text.secondary" variant="body2">
            Segmentation by business category.
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
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  innerRadius={58}
                  label={({ category, percent }) =>
                    `${category} ${(percent * 100).toFixed(0)}%`
                  }
                  nameKey="category"
                  outerRadius={96}
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      fill={colors[index % colors.length]}
                      key={entry.category}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default React.memo(CategoryChart)
