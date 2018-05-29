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
    registeringForm: false,
  };

  toggleForm = () => this.setState({registeringForm: !this.state.registeringForm});

  render() {
    const {registeringForm} = this.state;

    return (
      <Wrap>
        <Left>
          <img src={srcLogo} alt={'bidwin logo'}/>
          <LogoDescription>
            BidWin is a next-generation content delivery and monetization platform poweredby
          </LogoDescription>
        </Left>
        <Right zDepth={3}>
          {registeringForm
            ? <RegisterForm goToLogin={this.toggleForm}/>
            : <LoginForm goToRegister={this.toggleForm}/>
          }
        </Right>
      </Wrap>
    )
  }
}

export default LoginScreen;

/*
<div className='canvas'>

          <span className='loginLeft'>
            <div className='logo'>
              <img src={logo} alt={'bidwin logo'}/>
              <p className='sansP'>
                BidWin is a next-generation content delivery and monetization platform poweredby
              </p>
            </div>
          </span>

  <span className='loginRight'>
          {registeringForm
            ? <RegisterForm goToLogin={this.toggleForm}/>
            : <LoginForm goToRegister={this.toggleForm}/>
          }
          </span>
</div>*/
