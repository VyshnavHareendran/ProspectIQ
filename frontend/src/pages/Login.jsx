import { Box, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import BrandMark from '../components/brand/BrandMark'
import useAuth from '../hooks/useAuth'
import { routePaths } from '../routes/routePaths'

const LOGIN_ERROR_MESSAGE =
  'Unable to sign in. Check your email and password, then try again.'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async ({ email, password }) => {
    setErrorMessage('')
    setIsLoading(true)

    try {
      await login({ email, password })
      navigate(routePaths.dashboard, { replace: true })
    } catch {
      setErrorMessage(LOGIN_ERROR_MESSAGE)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
    component="main"
    sx={{
      position: 'relative',
      display: 'grid',
      minHeight: '100svh',
      overflow: 'hidden',
      placeItems: 'center',
      px: { xs: 2, sm: 3 },
      py: { xs: 3, sm: 5 },
      background:
        'radial-gradient(circle at 50% -10%, rgba(124, 45, 90, 0.13), transparent 38%), linear-gradient(180deg, #FDF9FB 0%, #F8FAFC 100%)',
      '&::before': {
        position: 'absolute',
        inset: 0,
        content: '""',
        pointerEvents: 'none',
        opacity: 0.36,
        backgroundImage:
          'radial-gradient(circle, rgba(100, 116, 139, 0.35) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, transparent 72%)',
        maskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)',
      },
      '@keyframes loginCardEnter': {
        from: {
          opacity: 0,
          transform: 'translateY(10px) scale(0.99)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        },
      },
    }}
    >
      <Paper
      aria-labelledby="login-title"
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 440,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        boxShadow:
          '0 1px 2px rgba(15, 23, 42, 0.04), 0 24px 64px rgba(15, 23, 42, 0.1)',
        animation: 'loginCardEnter 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: 3,
          content: '""',
          background:
            'linear-gradient(90deg, #D98AAF 0%, #7C2D5A 50%, #68224A 100%)',
        },
      }}
      >
        <Stack spacing={4} sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={3} alignItems="center">
            <BrandMark />

            <Stack spacing={1} sx={{ textAlign: 'center' }}>
              <Typography id="login-title" component="h1" variant="h2">
                Welcome back
              </Typography>
              <Typography color="text.secondary" variant="body2">
                AI-Powered Business Lead Intelligence
              </Typography>
            </Stack>
          </Stack>

          <LoginForm
            errorMessage={errorMessage}
            isLoading={isLoading}
            onSubmit={handleLogin}
          />
        </Stack>
      </Paper>
    </Box>
  )
}

export default Login
