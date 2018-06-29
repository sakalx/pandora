import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRoute from 'root/components/PrivateRoute'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {onLoadingAuth} from 'root/redux-core/actions/onLoad';

import LinearProgress from '@material-ui/core/LinearProgress';
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

const ProgressBar = styled(LinearProgress)`
  flex-grow: 1;
`;

// TODO set aria-label for all button => SpeedDial !!!
class App extends React.PureComponent {

  componentDidMount() {
    this.props.onLoadingAuth(true);
  };

  render() {
    const {onLoad} = this.props;

    if (onLoad.authStateChange) {
      return (
        <CenterWrap>
          <ProgressBar/>
        </CenterWrap>
      )
    }
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

const mapStateToProps = ({onLoad}) => ({
  onLoad,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onLoadingAuth,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)