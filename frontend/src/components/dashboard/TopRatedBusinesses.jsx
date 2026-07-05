import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import { Avatar, Box, Card, CardContent, Chip, Rating, Skeleton, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import React from 'react'

const getReviewCount = (business) =>
  business.review_count ?? business.google_review_count ?? business.reviews_count ?? 0

const TopRatedBusinesses = ({ businesses = [], loading = false }) => {
  const topBusinesses = businesses.slice(0, 5)

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">Top Rated Businesses</Typography>
          <Typography color="text.secondary" variant="body2">
            Highest rated accounts from available business data.
          </Typography>
        </Stack>

        {loading ? (
          <Stack spacing={1.5}>
            {[0, 1, 2, 3, 4].map((item) => (
              <Skeleton height={72} key={item} variant="rounded" />
            ))}
          </Stack>
        ) : null}

        {!loading && topBusinesses.length === 0 ? (
          <Box
            sx={(theme) => ({
              display: 'grid',
              minHeight: 300,
              placeItems: 'center',
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.03),
              textAlign: 'center',
            })}
          >
            <Stack alignItems="center" spacing={1}>
              <BusinessRoundedIcon color="action" />
              <Typography fontWeight={700}>No rated businesses</Typography>
              <Typography color="text.secondary" variant="body2">
                Businesses with Google ratings will appear here.
              </Typography>
            </Stack>
          </Box>
        ) : null}

        {!loading && topBusinesses.length > 0 ? (
          <Stack spacing={1.5}>
            {topBusinesses.map((business) => (
              <Box
                key={business.id || business.business_name}
                sx={(theme) => ({
                  p: 1.5,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  transition: theme.transitions.create(['box-shadow', 'transform']),
                  '&:hover': {
                    boxShadow: theme.shadows[1],
                    transform: 'translateY(-2px)',
                  },
                })}
              >
                <Stack direction="row" spacing={1.5}>
                  <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main' }}>
                    <BusinessRoundedIcon />
                  </Avatar>
                  <Stack spacing={0.75} sx={{ minWidth: 0, flex: 1 }}>
                    <Typography fontWeight={750} noWrap>
                      {business.business_name || business.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" flexWrap="wrap" gap={1}>
                      <Rating
                        precision={0.1}
                        readOnly
                        size="small"
                        value={Number(business.google_rating ?? business.rating ?? 0)}
                      />
                      <Typography color="text.secondary" variant="caption">
                        {getReviewCount(business)} reviews
                      </Typography>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      <Chip label={business.category || 'Uncategorized'} size="small" />
                      <Chip label={business.city || 'Unknown city'} size="small" variant="outlined" />
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </Stack>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default React.memo(TopRatedBusinesses)
