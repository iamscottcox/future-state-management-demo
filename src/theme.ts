import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600],
    },
    secondary: {
      main: red[200],
    },
  },
});

export default theme;
