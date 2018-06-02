import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import RegisterForm from './RegisterForm';
import LoginForm from './login-form';

import {
  Left,
  LogoDescription,
  Right,
  Wrap,
} from './style';
import srcLogo from 'root/assets/img/bidwin-logo-2.png'

class LoginScreen extends React.PureComponent {
  state = {value: 0};

  render() {
    return (
      <Wrap>
        <Left>
          <img src={srcLogo} alt={'bidwin logo'}/>
          <LogoDescription>
            BidWin is a next-generation content delivery and monetization platform poweredby
          </LogoDescription>
        </Left>
        <Right elevation={24}>
          <AppBar position='static' color='default'>
            <Tabs value={this.state.value}
                  onChange={(event, value) => this.setState({value})}
                  indicatorColor='primary'
                  textColor='primary'
                  fullWidth
            >
              <Tab label='Login'/>
              <Tab label='SignUp'/>
            </Tabs>
          </AppBar>
          <SwipeableViews index={this.state.value}
                          onChangeIndex={(index) => this.setState({value: index})}
          >
            <LoginForm/>
            <div >Item One</div>
          </SwipeableViews>
        </Right>
      </Wrap>
    )
  }
}

export default LoginScreen