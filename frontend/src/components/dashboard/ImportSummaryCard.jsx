import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import HourglassTopRoundedIcon from '@mui/icons-material/HourglassTopRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { Alert, Box, Card, CardContent, Grid, Skeleton, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import React from 'react'

const metrics = [
  ['Total Imports', 'total_imports', UploadFileRoundedIcon, 'primary'],
  ['Completed Imports', 'completed_imports', CloudDoneRoundedIcon, 'success'],
  ['Failed Imports', 'failed_imports', ErrorRoundedIcon, 'error'],
  ['Processing Imports', 'processing_imports', HourglassTopRoundedIcon, 'warning'],
  ['Imported Records', 'total_imported_records', Inventory2RoundedIcon, 'primary'],
]

const ImportSummaryCard = ({ summary, loading = false, error = '' }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
      <Stack spacing={0.5} sx={{ mb: 2.5 }}>
        <Typography variant="h3">Import Summary</Typography>
        <Typography color="text.secondary" variant="body2">
          Current CSV import health and record volume.
        </Typography>
      </Stack>

      {error ? <Alert severity="error">{error}</Alert> : null}

      {loading ? (
        <Grid container spacing={1.5}>
          {metrics.map(([label]) => (
            <Grid key={label} size={{ xs: 12, sm: 6 }}>
              <Skeleton height={84} variant="rounded" />
            </Grid>
          ))}
        </Grid>
      ) : null}

      {!loading && !error ? (
        <Grid container spacing={1.5}>
          {metrics.map(([label, key, Icon, color]) => (
            <Grid key={key} size={{ xs: 12, sm: key === 'total_imported_records' ? 12 : 6 }}>
              <Box
                sx={(theme) => ({
                  height: '100%',
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette[color].main, 0.04),
                })}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={(theme) => ({
                      display: 'grid',
                      width: 40,
                      height: 40,
                      placeItems: 'center',
                      borderRadius: 2,
                      color: `${color}.main`,
                      backgroundColor: alpha(theme.palette[color].main, 0.1),
                    })}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography color="text.secondary" variant="caption">
                      {label}
                    </Typography>
                    <Typography fontWeight={750} variant="h3">
                      {summary?.[key] ?? 0}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </CardContent>
  </Card>
)

export default React.memo(ImportSummaryCard)
