import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useMemo, useState } from 'react'

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return ''
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
  return `${baseUrl.replace(/\/$/, '')}/${imageUrl.replace(/^\//, '')}`
}

const FeatureImportance = ({ featureImportance, loading }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const imageUrl = useMemo(
    () => getImageUrl(featureImportance?.image_url),
    [featureImportance],
  )

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={0.5} sx={{ mb: 2.5 }}>
          <Typography variant="h3">Feature Importance</Typography>
          <Typography color="text.secondary" variant="body2">
            Model signal weights from the latest scoring run.
          </Typography>
        </Stack>

        {loading ? (
          <Box
            role="status"
            aria-label="Loading feature importance"
            sx={{ display: 'grid', minHeight: 280, placeItems: 'center' }}
          >
            <Stack alignItems="center" spacing={1.5}>
              <CircularProgress size={28} thickness={4} />
              <Typography color="text.secondary" variant="body2">
                Loading feature importance...
              </Typography>
            </Stack>
          </Box>
        ) : null}

        {!loading && imageUrl && !imageFailed ? (
          <Box
            component="img"
            src={imageUrl}
            alt="Lead score feature importance"
            onError={() => setImageFailed(true)}
            sx={{
              display: 'block',
              width: '100%',
              maxHeight: 560,
              objectFit: 'contain',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.default',
            }}
          />
        ) : null}

        {!loading && (!imageUrl || imageFailed) ? (
          <Box
            sx={(theme) => ({
              display: 'grid',
              minHeight: 260,
              placeItems: 'center',
              border: `1px dashed ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.03),
              textAlign: 'center',
            })}
          >
            <Stack alignItems="center" spacing={1}>
              {imageFailed ? (
                <ImageNotSupportedRoundedIcon color="action" />
              ) : (
                <InsightsRoundedIcon color="action" />
              )}
              <Typography fontWeight={700}>
                Feature importance image unavailable
              </Typography>
              <Typography color="text.secondary" variant="body2">
                The chart will appear here when the backend returns a valid image.
              </Typography>
            </Stack>
          </Box>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default FeatureImportance
