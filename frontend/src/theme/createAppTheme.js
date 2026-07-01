import { alpha, createTheme } from '@mui/material/styles'
import { colors, motion, radii, shadows } from './tokens'

const createAppTheme = () =>
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        50: colors.primarySoft,
        main: colors.primary,
        dark: colors.primaryDark,
        light: colors.primaryLight,
        contrastText: '#FFFFFF',
      },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
      divider: colors.border,
      success: { main: colors.success },
      warning: { main: colors.warning },
      error: { main: colors.danger },
    },
    typography: {
      fontFamily:
        'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.03em',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontSize: '1.125rem',
        fontWeight: 650,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      },
      body1: {
        fontSize: '0.9375rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 600,
        letterSpacing: 0,
        textTransform: 'none',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: radii.medium,
    },
    shadows: [
      'none',
      shadows.card,
      shadows.elevated,
      ...Array(22).fill(shadows.elevated),
    ],
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            transition: `background-color ${motion.fast} ${motion.easing}, border-color ${motion.fast} ${motion.easing}, color ${motion.fast} ${motion.easing}, box-shadow ${motion.fast} ${motion.easing}, transform ${motion.fast} ${motion.easing}`,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            minHeight: 40,
            paddingInline: 16,
            borderRadius: radii.small,
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: colors.primaryDark,
            },
          },
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            border: `1px solid ${colors.border}`,
            borderRadius: radii.medium,
            boxShadow: shadows.card,
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            minHeight: 44,
            borderRadius: radii.small,
            backgroundColor: colors.surface,
            transition: `box-shadow ${motion.fast} ${motion.easing}`,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#CBD5E1',
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 3px ${alpha(colors.primary, 0.12)}`,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
            },
          },
          notchedOutline: {
            borderColor: colors.border,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: radii.small,
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
          enterDelay: 500,
        },
        styleOverrides: {
          tooltip: {
            borderRadius: 6,
            fontSize: '0.75rem',
            backgroundColor: colors.sidebar,
          },
          arrow: {
            color: colors.sidebar,
          },
        },
      },
    },
  })

export default createAppTheme
