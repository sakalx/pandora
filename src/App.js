import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

//import {onAuthChanged} from 'root/firebase-core/authentication';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getUser} from './redux-core/actions/user';

import CircularProgress from '@material-ui/core/CircularProgress';

import MainScreen from './scenes/main-page';

import NotFoundPage from 'root/components/NotFoundPage';
import AlertMessage from 'root/components/AlertMessage';
import SnackBarMessage from 'root/components/SnackBarMessage';

import styled from 'styled-components';
import srcBackground from 'root/assets/img/background.jpg';


import PrivateRoute from 'root/components/PrivateRoute'

const CenterWrap = styled('div')`
  align-items: center;
  background-image: url(${srcBackground});
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

// TODO set aria-label for all button => SpeedDial !!!
class App extends React.Component {

  componentDidMount() {
    const {getUser} = this.props;





/*    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          getUser(user)
        } else {
          getUser(user)
        }
      }
    )*/
  }

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

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)