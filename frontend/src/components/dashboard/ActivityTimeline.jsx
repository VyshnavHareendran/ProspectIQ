import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

const activities = [
  {
    title: 'New leads reviewed',
    description: 'Priority scoring queue is ready for the next workflow.',
    time: 'Today',
    active: true,
  },
  {
    title: 'Business list refreshed',
    description: 'Recent businesses are synced from the live backend.',
    time: 'Today',
    active: true,
  },
  {
    title: 'Follow-up calls pending',
    description: 'Call activity will appear here after the calling workflow is enabled.',
    time: 'Upcoming',
    active: false,
  },
]

const ActivityTimeline = () => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
      <Stack spacing={0.5} sx={{ mb: 3 }}>
        <Typography variant="h3">Recent Activity</Typography>
        <Typography color="text.secondary" variant="body2">
          Placeholder timeline for account and sales activity.
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
        {activities.map((activity, index) => {
          const Icon = activity.active
            ? CheckCircleRoundedIcon
            : RadioButtonUncheckedRoundedIcon

          return (
            <Stack key={activity.title} direction="row" spacing={1.75}>
              <Box sx={{ position: 'relative', pt: 0.25 }}>
                <Box
                  sx={(theme) => ({
                    display: 'grid',
                    width: 34,
                    height: 34,
                    placeItems: 'center',
                    borderRadius: '50%',
                    color: activity.active
                      ? 'primary.main'
                      : 'text.secondary',
                    backgroundColor: activity.active
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.text.secondary, 0.08),
                  })}
                >
                  <Icon fontSize="small" />
                </Box>

                {index < activities.length - 1 ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 40,
                      bottom: -20,
                      left: 16,
                      width: 1,
                      backgroundColor: 'divider',
                    }}
                  />
                ) : null}
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={1.5}
                >
                  <Typography fontWeight={700}>{activity.title}</Typography>
                  <Typography
                    color="text.secondary"
                    variant="caption"
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    {activity.time}
                  </Typography>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  {activity.description}
                </Typography>
              </Box>
            </Stack>
          )
        })}
      </Stack>
    </CardContent>
  </Card>
)

export default ActivityTimeline
