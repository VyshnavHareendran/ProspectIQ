import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
})

const formatRole = (role) =>
  role ? role.replaceAll('_', ' ').toLowerCase() : 'user'

const WelcomeCard = ({ now, user }) => (
  <Card
    sx={(theme) => ({
      overflow: 'hidden',
      position: 'relative',
      border: 0,
      color: 'primary.contrastText',
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 58%, ${theme.palette.primary.light})`,
      boxShadow: theme.shadows[2],
    })}
  >
    <Box
      sx={(theme) => ({
        position: 'absolute',
        right: -80,
        top: -110,
        width: 280,
        height: 280,
        borderRadius: '50%',
        backgroundColor: alpha(theme.palette.common.white, 0.14),
      })}
    />
    <Box
      sx={(theme) => ({
        position: 'absolute',
        right: 140,
        bottom: -90,
        width: 220,
        height: 220,
        borderRadius: '50%',
        backgroundColor: alpha(theme.palette.common.white, 0.08),
      })}
    />

    <CardContent sx={{ position: 'relative', p: { xs: 3, md: 4 } }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'flex-end' }}
        justifyContent="space-between"
        spacing={3}
      >
        <Stack spacing={1.25}>
          <Typography sx={{ opacity: 0.82 }} variant="body2">
            Welcome back
          </Typography>
          <Typography component="h1" variant="h1">
            {user?.full_name || 'there'}
          </Typography>
          <Chip
            icon={<ShieldRoundedIcon />}
            label={formatRole(user?.role)}
            sx={(theme) => ({
              alignSelf: 'flex-start',
              color: 'primary.contrastText',
              fontWeight: 700,
              textTransform: 'capitalize',
              backgroundColor: alpha(theme.palette.common.white, 0.16),
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            })}
          />
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          sx={{ width: { xs: '100%', md: 'auto' } }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={(theme) => ({
              px: 1.75,
              py: 1.25,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.common.white, 0.14),
              backdropFilter: 'blur(10px)',
            })}
          >
            <CalendarMonthRoundedIcon fontSize="small" />
            <Typography fontWeight={700} variant="body2">
              {dateFormatter.format(now)}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={(theme) => ({
              px: 1.75,
              py: 1.25,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.common.white, 0.14),
              backdropFilter: 'blur(10px)',
            })}
          >
            <AccessTimeRoundedIcon fontSize="small" />
            <Typography fontWeight={700} variant="body2">
              {timeFormatter.format(now)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
)

export default WelcomeCard
