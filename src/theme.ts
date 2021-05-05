import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import customTheme from 'theme.json';

export const theme = createMuiTheme({
  ...customTheme,
  // ...{
  //   palette: {
  //     primary: {
  //       main: process.env.PRIMARY_COLOUR || red[600],
  //     },
  //     secondary: {
  //       main: process.env.SECONDARY_COLOUR || red[200],
  //     },
  //   },
  // },
});

export default theme;
