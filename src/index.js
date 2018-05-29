import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux-core/store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from './theme';

import ErrorBoundary from './components/ErrorBoundary';
import App from './App'

// TODO: move all css to styled-components
import './old-css-support/css/site-styles.css';

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <Provider store={store}>
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('#app'));
/*

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
  return (
    <React.Fragment>
      <CssBaseline />
      {/!* The rest of your application *!/}
    </React.Fragment>
  );
}

export default MyApp;*/
