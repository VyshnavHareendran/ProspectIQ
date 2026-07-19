import { Box, Stack, Typography } from '@mui/material'
import logo from '../../assets/logo.png'
import { Link as RouterLink } from 'react-router-dom'
import { routePaths } from '../../routes/routePaths'

const BrandMark = ({
  showWordmark = true,
  textColor = 'text.primary',
  logoSize = 48,
  wordmarkVariant = 'h5',
  wordmarkSx,
}) => (
  <Stack
    component={RouterLink}
    to={routePaths.dashboard}
    direction="row"
    spacing={showWordmark ? 1 : 0}
    alignItems="center"
    sx={{
      textDecoration: 'none',
      cursor: 'pointer',
      minWidth: 0,
    }}
  >
    <Box
      sx={{
        position: 'relative',
        width: logoSize,
        height: logoSize,
        flexShrink: 0,
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="ProspectIQ Logo"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: logoSize * 2.72,
          height: logoSize * 1.82,
          objectFit: 'contain',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Box>

    <Box
      sx={{
        display: showWordmark ? 'block' : 'none',
        minWidth: 0,
      }}
    >
      <Typography
        component="span"
        variant={wordmarkVariant}
        sx={{
          color: textColor,
          display: 'block',
          fontWeight: 750,
          letterSpacing: 0,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          ...wordmarkSx,
        }}
      >
        ProspectIQ
      </Typography>
    </Box>
  </Stack>
)

export default BrandMark
