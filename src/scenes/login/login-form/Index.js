import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {screen} from 'root/redux-core/types';
import {navigate} from 'root/redux-core/actions/navigate';
import {addUser, admitUser} from 'root/redux-core/actions/user';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Tooltip from '@material-ui/core/Tooltip';

import GoogleLogin from 'react-google-login';
import FacebookProvider, {Login as LoginFacebook} from 'react-facebook';

import muiTheme from 'root/theme';

const {palette} = muiTheme;
import {
  Description,
  FacebookLoginBtn,
  FailedMsg,
  GoogleLoginBtn,
  Link,
  SocialLoginTitle,
  Title,
  WrapButtons,
} from './style';

import {
  FacebookIcon, GoogleIcon,
  LoginIcon,
  SignUpIcon
} from 'root/icons';


class LoginForm extends React.PureComponent {
  state = {
    username: '',
    password: '',
    loginFailed: false,
  };

  handleLogin = (name, password) => {
    const authorizedUser = this._isUserAuthorized(name, password);

    authorizedUser
      ? this._admitUser(authorizedUser)
      : this.setState({loginFailed: true});
  };

  handleLoginFacebook = response => {
    if (!response.profile) {
      this._handleErrorLogin(response)
    } else {
      const {name, id, email} = response.profile;

      this._handleSocialMediaLogin({name, password: id, email});
    }
  };

  handleLoginGoogle = response => {
    if (!response.profileObj) {
      this._handleErrorLogin(response)
    } else {
      const {profileObj: {name, googleId, email}} = response;

      this._handleSocialMediaLogin({name, password: googleId, email});
    }
  };

  _isUserAuthorized = (name, password) =>
    this.props.userData.users.find(user =>
      user.name === name && user.password === password
    );

  _admitUser = ({_id}) => {
    const {navigate, admitUser} = this.props;

    admitUser(_id);
    // go to magic trick login
    navigate(screen.ROOT_SCREEN);
  };

  _handleErrorLogin = response => console.error(response);

  _handleSocialMediaLogin = ({name, password, email}) => {
    const authorizedUser = this._isUserAuthorized(name, password);

    if (authorizedUser) {
      this._admitUser(authorizedUser);
    } else {
      const {addUser, navigate} = this.props;
      const newUser = {
        name,
        password,
        email,
        username: name.split(' ')[1],
        company: `${name} Logged on from Social Media`,
      };

      addUser(newUser);
      // TODO when response will be valid json
      // go to magic trick login
      // navigate(screen.ROOT_SCREEN);
    }
  };

  render() {
    const {goToRegister} = this.props;
    const {username, password, loginFailed} = this.state;
    const errMsg = 'Wrong name or password';

    return (
      <div>
        <Title>Login</Title>
        <Description>
          Don't have an account?&nbsp;
          <Link onClick={goToRegister}>
            Create your account,&nbsp;
          </Link>
          it takes a couple of minutes
        </Description>
        <TextField hintText='Name'
                   floatingLabelText='User Name'
                   fullWidth={true}
                   onChange={({target}) => this.setState({username: target.value})}
                   errorText={loginFailed && {errMsg}}
        />
        <TextField hintText='Password'
                   floatingLabelText='User Password'
                   fullWidth={true}
                   type='password'
                   onChange={({target}) => this.setState({password: target.value})}
                   errorText={loginFailed && {errMsg}}
        />

        {loginFailed && <FailedMsg>Login Failed!</FailedMsg>}

        <WrapButtons>
          <Tooltip title='You must enter both name and password' placement='top'>
            <RaisedButton
              label='Login'
              primary={true}
              icon={<LoginIcon viewBox='0 0 500 500'/>}
              disabled={!(username.length && password.length)}
              onClick={() => this.handleLogin(username, password)}
            />
          </Tooltip>
          <Tooltip title='Sign up new user' placement='top'>
            <RaisedButton
              label='Sign Up'
              primary={true}
              icon={<SignUpIcon viewBox='0 0 500 500'/>}
              onClick={goToRegister}
            />
          </Tooltip>
        </WrapButtons>

        <SocialLoginTitle>Login with Social media</SocialLoginTitle>
        <WrapButtons>
          <FacebookProvider appId='1793837897321083'>
            <LoginFacebook
              scope='email'
              onResponse={this.handleLoginFacebook}
              onError={this.handleLoginFacebook}
            >
              <FacebookLoginBtn>
                <FacebookIcon viewBox='0 0 130 130' color={palette.alternateTextColor}/>
                <span>Facebook</span>
              </FacebookLoginBtn>
            </LoginFacebook>
          </FacebookProvider>
          <GoogleLoginBtn
            clientId='999108389649-2kil7c0ipbmf5q2hcjnl35alln5t7cko.apps.googleusercontent.com'
            onSuccess={this.handleLoginGoogle}
            onFailure={this.handleLoginGoogle}
            style={{}}
          >
            <GoogleIcon viewBox='0 0 520 520' color={palette.alternateTextColor}/>
            <span>Google</span>
          </GoogleLoginBtn>
        </WrapButtons>
      </div>
    )
  }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
  admitUser,
  addUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);