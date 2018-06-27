import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from 'root/components/PrivateRoute'

import CircularProgress from '@material-ui/core/CircularProgress';

import MainScreen from './scenes/main-page';

import NotFoundPage from 'root/components/NotFoundPage';
import AlertMessage from 'root/components/AlertMessage';
import SnackBarMessage from 'root/components/SnackBarMessage';

import styled from 'styled-components';
import srcBackground from 'root/assets/img/background.jpg';

const CenterWrap = styled('div')`
  align-items: center;
  background-image: url(${srcBackground});
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

// TODO set aria-label for all button => SpeedDial !!!
class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <CenterWrap>
          <BrowserRouter>
            <Switch>
              <PrivateRoute exact path='/' component={MainScreen}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </BrowserRouter>
        </CenterWrap>

        <SnackBarMessage/>
        <AlertMessage/>
      </React.Fragment>
    )
  }
}

export default App