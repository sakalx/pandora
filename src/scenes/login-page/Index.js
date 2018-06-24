import React from 'react';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/PersonPin';
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
  state = {
    tabIndex: 0,
  };

  render() {
    const {tabIndex} = this.state;
    return (
      <Wrap in={true} timeout={2000}>
        <div>
          <Left>
            <img alt={'bidwin logo'} src={srcLogo}/>
            <Slogan>
              BidWin is a next-generation of content delivery and monetization platform poweredby
            </Slogan>
          </Left>

          <Right elevation={24}>
            <TabsBar color='default' position='static'>
              <Tabs indicatorColor='primary'
                    onChange={(event, value) => this.setState({tabIndex: value})}
                    textColor='primary'
                    value={tabIndex}
                    fullWidth>
                <Tab icon={<PersonIcon/>} label='Login'/>
                <Tab icon={<PersonAddIcon/>} label='SignUp'/>
              </Tabs>
            </TabsBar>
            <SwipeableViews onChangeIndex={index => this.setState({tabIndex: index})}
                            index={tabIndex}>
              <LoginForm/>
              <SignUpForm/>
            </SwipeableViews>
          </Right>
        </div>
      </Wrap>
    )
  }
}

export default LoginScreen