import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

const StatCard = ({
  title,
  value,
  helperText,
  icon: Icon = TrendingUpRoundedIcon,
  loading = false,
}) => (
  <Card
    sx={(theme) => ({
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      transition: theme.transitions.create(['box-shadow', 'transform'], {
        duration: theme.transitions.duration.short,
      }),
      '&:before': {
        position: 'absolute',
        inset: 0,
        content: '""',
        pointerEvents: 'none',
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.1,
        )}, transparent 45%)`,
        opacity: 0,
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.short,
        }),
      },
      '&:hover': {
        boxShadow: theme.shadows[2],
        transform: 'translateY(-3px)',
        '&:before': {
          opacity: 1,
        },
      },
    })}
  >
    <CardContent sx={{ p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Stack spacing={1} sx={{ minWidth: 0 }}>
          <Typography color="text.secondary" fontWeight={700} variant="body2">
            {title}
          </Typography>
          <Typography variant="h2">
            {loading ? '...' : value}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {helperText}
          </Typography>
        </Stack>

        <Box
          sx={(theme) => ({
            display: 'grid',
            width: 46,
            height: 46,
            flexShrink: 0,
            placeItems: 'center',
            borderRadius: 2,
            color: 'primary.main',
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          })}
        >
          <Icon />
        </Box>
      </Stack>
    </CardContent>
  </Card>
)

export default StatCard
