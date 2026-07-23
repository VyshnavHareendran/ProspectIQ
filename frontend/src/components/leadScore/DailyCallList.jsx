import InboxRoundedIcon from '@mui/icons-material/InboxRounded'
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

const priorityStyles = {
  HIGH: { color: '#DC2626', backgroundColor: '#FEE2E2' },
  MEDIUM: { color: '#C2410C', backgroundColor: '#FFEDD5' },
  LOW: { color: '#15803D', backgroundColor: '#DCFCE7' },
}

const formatScore = (score) =>
  Number.isFinite(Number(score)) ? Number(score).toFixed(1) : '-'

const DailyCallList = ({ dailyCallList, loading }) => {
  const hasCalls = dailyCallList.length > 0

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">Daily Call List</Typography>
          <Typography color="text.secondary" variant="body2">
            Prioritized businesses ready for phone follow-up.
          </Typography>
        </Stack>

        {loading ? (
          <Box
            role="status"
            aria-label="Loading daily call list"
            sx={{ display: 'grid', minHeight: 220, placeItems: 'center' }}
          >
            <Stack alignItems="center" spacing={1.5}>
              <CircularProgress size={28} thickness={4} />
              <Typography color="text.secondary" variant="body2">
                Loading daily call list...
              </Typography>
            </Stack>
          </Box>
        ) : null}

        {!loading && !hasCalls ? (
          <Box
            sx={(theme) => ({
              display: 'grid',
              minHeight: 220,
              placeItems: 'center',
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.03),
              textAlign: 'center',
            })}
          >
            <Stack alignItems="center" spacing={1}>
              <InboxRoundedIcon color="action" />
              <Typography fontWeight={700}>No Daily Call List</Typography>
              <Typography color="text.secondary" variant="body2">
                Calls will appear here when the backend returns scheduled leads.
              </Typography>
            </Stack>
          </Box>
        ) : null}

        {!loading && hasCalls ? (
          <TableContainer>
            <Table sx={{ minWidth: 720 }} aria-label="Daily call list">
              <TableHead>
                <TableRow
                  sx={{
                    '& th': {
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 750,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    },
                  }}
                >
                  <TableCell>Business</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Lead Score</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell align="center">Assigned To</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyCallList.map((leadScore) => {
                  const business = leadScore.business || {}
                  const phoneNumber = business.phone_number

                  return (
                    <TableRow hover key={leadScore.id}>
                      <TableCell>
                        <Typography fontWeight={700}>
                          {business.business_name || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={leadScore.priority || 'UNKNOWN'}
                          size="small"
                          sx={{
                            borderRadius: 999,
                            fontWeight: 800,
                            ...(priorityStyles[leadScore.priority] || {}),
                          }}
                        />
                      </TableCell>
                      <TableCell>{formatScore(leadScore.lead_score)}</TableCell>
                      <TableCell>{phoneNumber || '-'}</TableCell>
                      <TableCell align="center">
                        <Typography fontWeight={600}>
                          {leadScore.assigned_to || "Unassigned"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default DailyCallList
