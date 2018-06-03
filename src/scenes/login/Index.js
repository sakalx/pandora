import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import PersonAdd from '@material-ui/icons/PersonAdd';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import SwipeableViews from 'react-swipeable-views';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import SignUpForm from './signup-form';
import LoginForm from './login-form';

import {
  Left,
  Slogan,
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
          <Slogan>
            BidWin is a next-generation content delivery and monetization platform poweredby
          </Slogan>
        </Left>
        <Right elevation={24}>
          <AppBar position='static' color='default'>
            <Tabs value={this.state.value}
                  onChange={(event, value) => this.setState({value})}
                  indicatorColor='primary'
                  textColor='primary'
                  fullWidth
            >
              <Tab label='Login' icon={<PersonPinIcon/>}/>
              <Tab label='SignUp' icon={<PersonAdd/>}/>
            </Tabs>
          </AppBar>
          <SwipeableViews index={this.state.value}
                          onChangeIndex={(index) => this.setState({value: index})}
          >
            <LoginForm/>
            <SignUpForm/>
          </SwipeableViews>
        </Right>
      </Wrap>
    )
  }
}

export default LoginScreen