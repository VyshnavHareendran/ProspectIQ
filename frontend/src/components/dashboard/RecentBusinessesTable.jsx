import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import {
  Alert,
  Box,
  Button,
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
import { useNavigate } from 'react-router-dom'
import { routePaths } from '../../routes/routePaths'

const formatDate = (value) => {
  if (!value) {
    return '—'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const formatStatus = (value) =>
  value ? value.replaceAll('_', ' ').toLowerCase() : 'unknown'

const RecentBusinessesTable = ({ businesses, error, loading }) => {
  const navigate = useNavigate()
  const hasBusinesses = businesses.length > 0

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2.5 }}
        >
          <Box>
            <Typography variant="h3">Recent Businesses</Typography>
            <Typography color="text.secondary" variant="body2">
              Latest records from the live businesses API.
            </Typography>
          </Box>

          <Button
            endIcon={<ArrowForwardRoundedIcon />}
            variant="outlined"
            onClick={() => navigate(routePaths.businesses)}
          >
            View All Businesses
          </Button>
        </Stack>

        {error ? (
          <Alert
            icon={<ErrorOutlineRoundedIcon fontSize="inherit" />}
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        ) : null}

        {loading ? (
          <Box
            role="status"
            aria-label="Loading recent businesses"
            sx={{ display: 'grid', minHeight: 260, placeItems: 'center' }}
          >
            <Stack alignItems="center" spacing={1.5}>
              <CircularProgress size={28} thickness={4} />
              <Typography color="text.secondary" variant="body2">
                Loading recent businesses...
              </Typography>
            </Stack>
          </Box>
        ) : null}

        {!loading && !error && !hasBusinesses ? (
          <Box
            sx={(theme) => ({
              display: 'grid',
              minHeight: 240,
              placeItems: 'center',
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.03),
              textAlign: 'center',
            })}
          >
            <Stack alignItems="center" spacing={1}>
              <InboxRoundedIcon color="action" />
              <Typography fontWeight={700}>No businesses yet</Typography>
              <Typography color="text.secondary" variant="body2">
                Recent businesses will appear here after records are created.
              </Typography>
            </Stack>
          </Box>
        ) : null}

        {!loading && hasBusinesses ? (
          <TableContainer>
            <Table sx={{ minWidth: 780 }} aria-label="Recent businesses">
              <TableHead>
                <TableRow
                  sx={{
                    '& th': {
                      borderBottomColor: 'divider',
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 750,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    },
                  }}
                >
                  <TableCell>Business Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Google Rating</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businesses.map((business) => (
                  <TableRow
                    key={business.id}
                    hover
                    sx={{
                      '&:last-child td': { borderBottom: 0 },
                      '& td': { py: 1.75 },
                    }}
                  >
                    <TableCell>
                      <Typography fontWeight={700}>
                        {business.business_name}
                      </Typography>
                    </TableCell>
                    <TableCell>{business.category || '—'}</TableCell>
                    <TableCell>{business.city || '—'}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <StarRoundedIcon
                          color="warning"
                          fontSize="small"
                        />
                        <Typography fontWeight={700}>
                          {business.google_rating ?? '—'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={formatStatus(business.status)}
                        size="small"
                        sx={(theme) => ({
                          borderRadius: 999,
                          fontWeight: 700,
                          textTransform: 'capitalize',
                          color: theme.palette.primary.dark,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1,
                          ),
                        })}
                      />
                    </TableCell>
                    <TableCell>{formatDate(business.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default RecentBusinessesTable
