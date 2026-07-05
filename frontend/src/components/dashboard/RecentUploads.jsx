import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded'
import { Box, Chip, List, ListItem, ListItemAvatar, ListItemText, Avatar, Card, CardContent, Skeleton, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import React from 'react'

const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

const formatStatus = (value) =>
  value ? value.replaceAll('_', ' ').toLowerCase() : 'unknown'

const RecentUploads = ({ uploads = [], loading = false }) => (
  <Card>
    <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
      <Stack spacing={0.5} sx={{ mb: 2 }}>
        <Typography variant="h3">Recent Uploads</Typography>
        <Typography color="text.secondary" variant="body2">
          Latest import files and processing results.
        </Typography>
      </Stack>

      {loading ? (
        <Stack spacing={1}>
          {[0, 1, 2].map((item) => (
            <Skeleton height={68} key={item} variant="rounded" />
          ))}
        </Stack>
      ) : null}

      {!loading && uploads.length === 0 ? (
        <Box
          sx={(theme) => ({
            display: 'grid',
            minHeight: 160,
            placeItems: 'center',
            border: `1px dashed ${theme.palette.divider}`,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.primary.main, 0.03),
            textAlign: 'center',
          })}
        >
          <Stack alignItems="center" spacing={1}>
            <InsertDriveFileRoundedIcon color="action" />
            <Typography fontWeight={700}>No uploads yet</Typography>
            <Typography color="text.secondary" variant="body2">
              Recent CSV uploads will appear here after import activity starts.
            </Typography>
          </Stack>
        </Box>
      ) : null}

      {!loading && uploads.length > 0 ? (
        <List disablePadding>
          {uploads.map((upload) => (
            <ListItem
              divider
              key={upload.id || upload.filename}
              sx={{ px: 0, py: 1.5 }}
              secondaryAction={
                <Chip
                  label={formatStatus(upload.status)}
                  size="small"
                  sx={{ fontWeight: 700, textTransform: 'capitalize' }}
                />
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main' }}>
                  <InsertDriveFileRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={upload.filename || upload.file_name}
                secondary={`${formatDate(upload.upload_date || upload.created_at)} · ${
                  upload.imported_records ?? 0
                } records`}
                primaryTypographyProps={{ fontWeight: 750, noWrap: true, pr: 10 }}
                secondaryTypographyProps={{ color: 'text.secondary' }}
              />
            </ListItem>
          ))}
        </List>
      ) : null}
    </CardContent>
  </Card>
)

export default React.memo(RecentUploads)
