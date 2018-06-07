import React from 'react';


import PersonAdd from '@material-ui/icons/PersonAdd';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import SwipeableViews from 'react-swipeable-views';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import SignUpForm from './signup-form';
import LoginForm from './login-form';

import {
  Left,
  Right,
  Slogan,
  TabsBar,
  Wrap,
} from './style';
import srcLogo from 'root/assets/img/bidwin-logo-2.png'

class LoginScreen extends React.PureComponent {
  state = {value: 0};

  render() {
    return (
      <Wrap>
        <Left>
          <img alt={'bidwin logo'} src={srcLogo}/>
          <Slogan>
            BidWin is a next-generation content delivery and monetization platform poweredby
          </Slogan>
        </Left>
        <Right elevation={24}>
          <TabsBar color='default' position='static'>
            <Tabs fullWidth
                  indicatorColor='primary'
                  onChange={(event, value) => this.setState({value})}
                  textColor='primary'
                  value={this.state.value}>
              <Tab icon={<PersonPinIcon/>} label='Login'/>
              <Tab icon={<PersonAdd/>} label='SignUp'/>
            </Tabs>
          </TabsBar>
          <SwipeableViews onChangeIndex={(index) => this.setState({value: index})}
                          index={this.state.value}>
            <LoginForm/>
            <SignUpForm/>
          </SwipeableViews>
        </Right>
      </Wrap>
    )
  }
}

export default LoginScreen