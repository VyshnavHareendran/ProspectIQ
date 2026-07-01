import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { Box, Stack, Typography } from '@mui/material'

const BrandMark = ({ showWordmark = true, textColor = 'text.primary' }) => (
  <Stack direction="row" spacing={1.25} alignItems="center">
    <Box
      aria-hidden="true"
      sx={{
        display: 'grid',
        width: 42,
        height: 42,
        flexShrink: 0,
        placeItems: 'center',
        color: 'common.white',
        borderRadius: 2.5,
        background:
          'linear-gradient(145deg, #B85C8D 0%, #7C2D5A 55%, #68224A 100%)',
        boxShadow: '0 8px 18px rgba(124, 45, 90, 0.24)',
      }}
    >
      <AutoAwesomeRoundedIcon sx={{ fontSize: 22 }} />
    </Box>

    {showWordmark && (
      <Typography
        component="span"
        variant="h3"
        sx={{ color: textColor, fontWeight: 750, letterSpacing: '-0.025em' }}
      >
        ProspectIQ
      </Typography>
    )}
  </Stack>
)

export default BrandMark
