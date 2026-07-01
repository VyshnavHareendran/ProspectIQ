import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import PasswordField from './PasswordField'

const noOp = () => undefined

const LoginForm = ({ errorMessage = '', isLoading = false, onSubmit = noOp }) => {
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  return (
    <Stack
      component="form"
      noValidate
      spacing={1.5}
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorMessage && (
        <Alert
          severity="error"
          variant="outlined"
          sx={{
            alignItems: 'center',
            mb: 1,
            borderColor: 'rgba(239, 68, 68, 0.3)',
            backgroundColor: 'rgba(254, 242, 242, 0.72)',
            '& .MuiAlert-message': {
              fontSize: '0.8125rem',
              lineHeight: 1.5,
            },
          }}
        >
          {errorMessage}
        </Alert>
      )}

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email address is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Enter a valid email address',
          },
        }}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <TextField
            {...field}
            inputRef={ref}
            fullWidth
            disabled={isLoading}
            type="email"
            label="Email address"
            autoComplete="email"
            autoFocus
            error={Boolean(error)}
            helperText={error?.message || ' '}
          />
        )}
      />

      <PasswordField control={control} disabled={isLoading} />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: '-4px !important' }}
      >
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  disabled={isLoading}
                  inputRef={field.ref}
                  name={field.name}
                  size="small"
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              }
              label="Remember me"
              sx={{
                mr: 1,
                '& .MuiFormControlLabel-label': {
                  color: 'text.secondary',
                  fontSize: '0.8125rem',
                },
              }}
            />
          )}
        />

        <Link
          component="button"
          type="button"
          underline="hover"
          disabled={isLoading}
          sx={{ flexShrink: 0, fontSize: '0.8125rem', fontWeight: 600 }}
        >
          Forgot password?
        </Link>
      </Stack>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={isLoading}
        aria-busy={isLoading}
        sx={{
          minHeight: 44,
          mt: '8px !important',
          boxShadow: '0 6px 14px rgba(124, 45, 90, 0.2)',
          '&:hover': {
            boxShadow: '0 8px 18px rgba(124, 45, 90, 0.26)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        }}
      >
        {isLoading ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress size={16} thickness={5} color="inherit" />
            <Typography component="span" variant="button">
              Signing in...
            </Typography>
          </Stack>
        ) : (
          'Sign in'
        )}
      </Button>
    </Stack>
  )
}

export default LoginForm
