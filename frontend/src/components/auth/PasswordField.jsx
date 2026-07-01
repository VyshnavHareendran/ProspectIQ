import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

const PasswordField = ({ control, disabled = false }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <Controller
      name="password"
      control={control}
      rules={{ required: 'Password is required' }}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          inputRef={ref}
          fullWidth
          disabled={disabled}
          type={isPasswordVisible ? 'text' : 'password'}
          label="Password"
          autoComplete="current-password"
          error={Boolean(error)}
          helperText={error?.message || ' '}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    size="small"
                    disabled={disabled}
                    aria-label={
                      isPasswordVisible ? 'Hide password' : 'Show password'
                    }
                    aria-pressed={isPasswordVisible}
                    onClick={() => setIsPasswordVisible((visible) => !visible)}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    {isPasswordVisible ? (
                      <VisibilityOffRoundedIcon fontSize="small" />
                    ) : (
                      <VisibilityRoundedIcon fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  )
}

export default PasswordField
