import React from 'react';

import {
  facebookProvider, googleProvider, signInWithEmail, signInWithSocial,
} from 'root/firebase-core/authentication';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getUser} from 'root/redux-core/actions/user';
import {toggleSnackbar} from 'root/redux-core/actions/notification';

import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import {muiPalette, customColor} from 'root/theme';
import {LoginBtn, SocialLoginBtn, Title, Wrap, WrapButtons,} from './style';

import {FacebookIcon, GoogleIcon} from 'root/icons';

class LoginForm extends React.PureComponent {
  state = {
    email: '',
    password: '',
  };

  handleLogin = (email, password) => {
    signInWithEmail(email, password)
      .then(res => console.log(res))
      .catch(error => this.props.toggleSnackbar(error.message));
  };

  handleSocialLogin = provider =>
    signInWithSocial(provider)
      .then(response =>
        this.props.toggleSnackbar(`Welcome ${response.user.displayName}`))
      .catch(error => this.props.toggleSnackbar(error.message));

  renderInputField = value =>
    <FormControl>
      <InputLabel htmlFor={`login-input-${value}`}>
        {value[0].toUpperCase() + value.slice(1)}
      </InputLabel>
      <Input
        id={`login-input-${value}`}
        type={value}
        value={this.state[value]}
        onChange={({target}) => this.setState({[value]: target.value})}
      />
    </FormControl>;

  render() {
    const {email, password} = this.state;

    return (
      <Wrap>
        <Title variant='display2'>
          {[...'Login'].map((char, index) =>
            <Fade in={true} key={index.toString()} timeout={5000 + (index * 2000)}>
              <span>{char}</span>
            </Fade>
          )}
        </Title>
        {this.renderInputField('email')}
        {this.renderInputField('password')}

        <Collapse in={!!(email.length && password.length)}>
          <WrapButtons>
            <LoginBtn onClick={() => this.handleLogin(email, password)}
                      color='primary' size='large' variant='outlined'>
              Login
            </LoginBtn>
          </WrapButtons>
        </Collapse>

        <Typography color='textSecondary' variant='body2'>Or login via</Typography>
        <WrapButtons>
          <Slide direction='down' in={true} timeout={1500}>
            <SocialLoginBtn backgroundcolor={customColor.facebookColor}
                            onClick={() => this.handleSocialLogin(facebookProvider)}
                            variant='raised'>
              <FacebookIcon viewBox='0 0 130 130' style={{color: muiPalette.common.white}}/>
              Facebook
            </SocialLoginBtn>
          </Slide>

          <Slide timeout={1700} direction='down' in={true}>
            <SocialLoginBtn backgroundcolor={customColor.googleColor}
                            onClick={() => this.handleSocialLogin(googleProvider)}
                            variant='raised'>
              <GoogleIcon style={{color: muiPalette.common.white}} viewBox='0 0 520 520'/>
              Google
            </SocialLoginBtn>
          </Slide>
        </WrapButtons>
      </Wrap>
    )
  }
}

const mapStateToProps = ({notification}) => ({
  notification,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSnackbar,
  getUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);