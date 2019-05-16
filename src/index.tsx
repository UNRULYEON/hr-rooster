import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import LuxonUtils from '@date-io/luxon';

// Main theme of the web app
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d6335b',
      main: '#CC0033',
      dark: '#8e0023',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5393ff',
      main: '#2979ff',
      dark: '#1c54b2',
      contrastText: '#000',
    },
    type: 'dark',
  },
  typography: { useNextVariants: true },
});

ReactDOM.render(
  <MuiPickersUtilsProvider utils={LuxonUtils}>
    <MuiThemeProvider theme={theme} >
      <App />
    </MuiThemeProvider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
