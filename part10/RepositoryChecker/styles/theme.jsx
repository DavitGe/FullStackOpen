import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    background: '#e1e4e8',
    errorText: '#cc0000',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'Sans-serif',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
}

export default theme
