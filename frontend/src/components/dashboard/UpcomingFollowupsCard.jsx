import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import {
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'

const UpcomingFollowupsCard = ({
  followups = [],
  loading = false,
  error = '',
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <EventAvailableRoundedIcon color="primary" />

            <Typography variant="h3">
              Upcoming Follow-ups
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          {loading &&
            [...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                height={60}
                variant="rounded"
              />
            ))}

          {!loading &&
            !error &&
            followups.map((item) => (
              <Stack
                key={item.id}
                spacing={1}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack spacing={0.3}>
                    <Typography fontWeight={600}>
                      {item.business_name}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {item.employee_name}
                    </Typography>
                  </Stack>

                  <Chip
                    size="small"
                    label={item.next_followup_date}
                    color="primary"
                  />
                </Stack>

                <Divider />
              </Stack>
            ))}

          {!loading &&
            !error &&
            followups.length === 0 && (
              <Typography
                color="text.secondary"
              >
                No upcoming follow-ups.
              </Typography>
            )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default UpcomingFollowupsCard