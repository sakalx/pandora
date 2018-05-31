import React from 'react';

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
  state = {
    loginForm: true,
  };

  toggleForm = () => this.setState({loginForm: !this.state.loginForm});

  render() {
    const {loginForm} = this.state;

    return (
      <Wrap>
        <Left>
          <img src={srcLogo} alt={'bidwin logo'}/>
          <LogoDescription>
            BidWin is a next-generation content delivery and monetization platform poweredby
          </LogoDescription>
        </Left>
        <Right elevation={24}>
          {loginForm
            ? <LoginForm goToRegister={this.toggleForm}/>
            : <RegisterForm goToLogin={this.toggleForm}/>
          }
        </Right>
      </Wrap>
    )
  }
}

export default LoginScreen