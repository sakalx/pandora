import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setUserToken, getUserToken} from './helpers/local-storage';
import {screen} from './redux-core/types';
import {navigate} from './redux-core/actions/navigate';
import {getUsers, admitUser} from './redux-core/actions/user';
import {toggleSnackbar} from './redux-core/actions/notification';

import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import MainScreen from './scenes/MainScreen';
import LoginScreen from './scenes/login';

import styled from 'styled-components';
import srcBackground from 'root/assets/img/background.jpg';

const CenterWrap = styled('div')`
  align-items: center;
  background-image: url(${srcBackground});
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

class App extends React.PureComponent {
  state = {};

  componentDidMount() {
    const {navigate, getUsers} = this.props;

    getUsers();
    navigate(screen.ROOT_SCREEN);
  }

  static getDerivedStateFromProps({navigate, stackScreen, getUsers, userData, admitUser}) {
    // magic trick login 😈
    if (stackScreen[screen.ROOT_SCREEN]) {
      const hasUsersData = userData.users.length;
      const authorizedUser = userData.user._id;

      if (hasUsersData && !authorizedUser) {
        const token = getUserToken();

        if (token) {
          admitUser(token);
          navigate(screen.MAIN);
          return null;
        }
      }

      if (authorizedUser) {
        navigate(screen.MAIN);
        setUserToken(authorizedUser);
        return null;
      }

      if (hasUsersData) {
        navigate(screen.LOGIN);
        return null;
      }
    }
    return null;
  }

  render() {
    const {stackScreen, notification, toggleSnackbar} = this.props;

    const isPartOfMainScreen = Object.keys(stackScreen)
      .filter(screenName =>
        screenName !== screen.LOGIN && screenName !== screen.ROOT_SCREEN)
      .some(screenName => stackScreen[screenName]);

    return (
      <React.Fragment>
        <CenterWrap>
          {stackScreen[screen.ROOT_SCREEN] && <CircularProgress size={54}/>}
          {stackScreen[screen.LOGIN] && <LoginScreen/>}
          {isPartOfMainScreen && <MainScreen/>}
        </CenterWrap>

        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={notification.showSnackBar}
          onClose={() => toggleSnackbar()}
          ContentProps={{'aria-describedby': 'snackBar-msg'}}
          message={
            <span id='snackBar-msg'>{notification.snackBarMsg}</span>
          }
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({stackScreen, userData, notification}) => ({
  notification,
  stackScreen,
  userData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  admitUser,
  getUsers,
  navigate,
  toggleSnackbar,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)