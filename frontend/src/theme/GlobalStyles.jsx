import GlobalStyles from '@mui/material/GlobalStyles'
import { colors } from './tokens'

const AppGlobalStyles = () => (
  <GlobalStyles
    styles={{
      '*': {
        boxSizing: 'border-box',
      },
      html: {
        minWidth: 320,
        minHeight: '100%',
        backgroundColor: colors.background,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      },
      body: {
        minWidth: 320,
        minHeight: '100vh',
        margin: 0,
        backgroundColor: colors.background,
      },
      '#root': {
        minHeight: '100vh',
        isolation: 'isolate',
      },
      '::selection': {
        color: colors.text,
        backgroundColor: '#F9D8E8',
      },
      'button, input, textarea, select': {
        font: 'inherit',
      },
      'a, button': {
        WebkitTapHighlightColor: 'transparent',
      },
      'a:focus-visible, button:focus-visible': {
        outline: `2px solid ${colors.primary}`,
        outlineOffset: 2,
      },
      '@media (prefers-reduced-motion: reduce)': {
        '*, *::before, *::after': {
          scrollBehavior: 'auto !important',
          transitionDuration: '0.01ms !important',
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
        },
      },
    }}
  />
)

export default AppGlobalStyles
