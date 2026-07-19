import CallRoundedIcon from '@mui/icons-material/CallRounded'
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'

const outcomeColor = (outcome) => {
  switch (outcome?.toUpperCase()) {
    case 'INTERESTED':
      return 'success'
    case 'FOLLOW_UP':
    case 'CALLBACK':
      return 'info'
    case 'NOT_INTERESTED':
      return 'error'
    case 'NO_ANSWER':
      return 'warning'
    default:
      return 'default'
  }
}

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

const RecentCallLogsCard = ({
  calls = [],
  loading = false,
  error = '',
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>

        <Stack spacing={0.5} sx={{ mb: 2 }}>
          <Typography variant="h3">
            Recent Call Logs
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Latest sales activities.
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {loading ? (
          <Skeleton
            variant="rounded"
            height={320}
          />
        ) : (
          <List disablePadding>

            {calls.map((call, index) => (
              <React.Fragment key={call.id}>

                <ListItem disableGutters>

                  <ListItemAvatar>
                    <Avatar color="primary">
                      <CallRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={call.business_name}
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          component="span"
                        >
                          {call.employee_name}
                        </Typography>

                        <br />

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {formatDate(call.created_at)}
                        </Typography>
                      </>
                    }
                  />

                  <Chip
                    label={call.call_outcome}
                    color={outcomeColor(call.call_outcome)}
                    size="small"
                  />

                </ListItem>

                {index !== calls.length - 1 && (
                  <Divider />
                )}

              </React.Fragment>
            ))}

            {!calls.length && (
              <Box
                sx={{
                  py: 6,
                  textAlign: 'center',
                }}
              >
                <Typography color="text.secondary">
                  No recent calls.
                </Typography>
              </Box>
            )}

          </List>
        )}

      </CardContent>
    </Card>
  )
}

export default React.memo(RecentCallLogsCard)