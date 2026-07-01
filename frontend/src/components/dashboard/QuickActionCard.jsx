import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const QuickActionCard = ({ title, description, icon: Icon, to }) => {
  const navigate = useNavigate()

  return (
    <Card
      sx={(theme) => ({
        height: '100%',
        overflow: 'hidden',
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          boxShadow: theme.shadows[2],
          transform: 'translateY(-3px)',
        },
      })}
    >
      <CardActionArea
        onClick={() => navigate(to)}
        sx={{ height: '100%', alignItems: 'stretch' }}
      >
        <CardContent sx={{ height: '100%', p: 2.5 }}>
          <Stack direction="row" spacing={2} sx={{ height: '100%' }}>
            <Box
              sx={(theme) => ({
                display: 'grid',
                width: 44,
                height: 44,
                flexShrink: 0,
                placeItems: 'center',
                borderRadius: 2,
                color: 'primary.main',
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              })}
            >
              <Icon />
            </Box>

            <Stack spacing={0.5} sx={{ minWidth: 0, flex: 1 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Typography fontWeight={750}>{title}</Typography>
                <ArrowForwardRoundedIcon
                  color="action"
                  fontSize="small"
                  sx={{ flexShrink: 0 }}
                />
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {description}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default QuickActionCard
