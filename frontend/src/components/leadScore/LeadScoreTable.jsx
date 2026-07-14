import { useState } from 'react'
import CallLogDialog from "../callLogs/CallLogDialog";

import CallRoundedIcon from '@mui/icons-material/CallRounded'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Pagination,
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
  HIGH: {
    color: '#DC2626',
    backgroundColor: '#FEE2E2',
  },
  MEDIUM: {
    color: '#C2410C',
    backgroundColor: '#FFEDD5',
  },
  LOW: {
    color: '#15803D',
    backgroundColor: '#DCFCE7',
  },
}

const formatScore = (score) =>
  Number.isFinite(Number(score)) ? Number(score).toFixed(1) : '-'

const getPriorityStyle = (priority) =>
  priorityStyles[priority] || {
    color: '#475569',
    backgroundColor: '#E2E8F0',
  }

const LeadScoreTable = ({
  leadScores,
  loading,
  onPageChange,
  pagination,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const hasLeadScores = leadScores.length > 0
  const start = pagination.total
    ? (pagination.page - 1) * pagination.pageSize + 1
    : 0
  const end = Math.min(pagination.page * pagination.pageSize, pagination.total)

  return (
        <>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: '0 8px 25px rgba(0,0,0,.08)',
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table sx={{ minWidth: 980 }} aria-label="Lead scores">
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
                      <TableCell>Lead Score</TableCell>
                      <TableCell>Priority</TableCell>
                      <TableCell>Google Rating</TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <Box
                            role="status"
                            aria-label="Loading lead scores"
                            sx={{
                              display: 'grid',
                              minHeight: 260,
                              placeItems: 'center',
                            }}
                          >
                            <Stack alignItems="center" spacing={1.5}>
                              <CircularProgress size={28} thickness={4} />
                              <Typography color="text.secondary" variant="body2">
                                Loading lead scores...
                              </Typography>
                            </Stack>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : null}

                    {!loading && !hasLeadScores ? (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <Box
                            sx={(theme) => ({
                              display: 'grid',
                              minHeight: 260,
                              placeItems: 'center',
                              textAlign: 'center',
                              backgroundColor: alpha(theme.palette.primary.main, 0.03),
                            })}
                          >
                            <Stack alignItems="center" spacing={1}>
                              <InboxRoundedIcon color="action" sx={{ fontSize: 44 }} />
                              <Typography variant="h5" fontWeight={700}>
                                No Lead Scores Found
                              </Typography>
                              <Typography color="text.secondary" variant="body2">
                                Try adjusting search or filters.
                              </Typography>
                            </Stack>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : null}

                    {!loading
                      ? leadScores.map((leadScore) => {
                          const business = leadScore.business || {}
                          const phoneNumber = business.phone_number

                          return (
                            <TableRow
                              hover
                              key={leadScore.id}
                              sx={{
                                '&:last-child td': { borderBottom: 0 },
                                '& td': { py: 1.75 },
                              }}
                            >
                              <TableCell>
                                <Typography fontWeight={700}>
                                  {business.business_name || '-'}
                                </Typography>
                              </TableCell>
                              <TableCell>{business.category || '-'}</TableCell>
                              <TableCell>{business.city || '-'}</TableCell>
                              <TableCell>
                                <Typography fontWeight={800}>
                                  {formatScore(leadScore.lead_score)}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={leadScore.priority || 'UNKNOWN'}
                                  size="small"
                                  sx={{
                                    borderRadius: 999,
                                    fontWeight: 800,
                                    ...getPriorityStyle(leadScore.priority),
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                  <StarRoundedIcon color="warning" fontSize="small" />
                                  <Typography fontWeight={700}>
                                    {business.google_rating ?? '-'}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell sx={{ maxWidth: 320 }}>
                                <Typography
                                  color="text.secondary"
                                  variant="body2"
                                  sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                  }}
                                >
                                  {leadScore.score_reason || '-'}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  disabled={!phoneNumber}
                                  size="small"
                                  startIcon={<CallRoundedIcon />}
                                  variant="outlined"
                                  onClick={() => {
                                    setSelectedBusiness({
                                      ...business,
                                      lead_score: leadScore.lead_score,
                                      priority: leadScore.priority,
                                    })
                                    setDialogOpen(true)
                                  }}
                                >
                                  Call
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box
                sx={{
                  borderTop: '1px solid',
                  borderTopColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 2.5,
                }}
              >
                <Typography color="text.secondary" variant="body2">
                  Showing {start}-{end} of {pagination.total}
                </Typography>

                <Pagination
                  color="primary"
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={(_, page) => onPageChange(page)}
                />
              </Box>
            </CardContent>
          </Card>

          <CallLogDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            business={selectedBusiness}
          />
        </>
      )
}

export default LeadScoreTable
