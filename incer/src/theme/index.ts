import { createTheme } from '@material-ui/core/styles';

import pallete from './colors';

const LamininTheme = createTheme({
  typography: {
    fontFamily: ['Roboto'].join(','),
    button: {
      color: '#fff',
    },
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: pallete.PRIMARY,
      // dark: will be calculated from palette.primary.main,
      contrastText: '#fff',
    },
    secondary: {
      //   light: '#0066ff',
      main: pallete.SENCODARY,
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff',
    },
    // error: will use the default color
  },
});

export default LamininTheme;
