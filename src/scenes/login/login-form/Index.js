import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {screen} from 'root/redux-core/types';
import {navigate} from 'root/redux-core/actions/navigate';
import {addUser, admitUser} from 'root/redux-core/actions/user';

import FacebookProvider, {Login as LoginFacebook} from 'react-facebook';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import {muiPalette} from "root/theme";
import {
  FacebookLoginBtn,
  GoogleLoginBtn,
  WrapButtons,
  LoginBtn,
} from './style';

import {FacebookIcon, GoogleIcon} from 'root/icons';

class LoginForm extends React.PureComponent {
  state = {
    username: '',
    password: '',
    failedLogin: false,
  };

  handleLogin = (name, password) => {
    const authorizedUser = this._isUserAuthorized(name, password);
    authorizedUser
      ? this._admitUser(authorizedUser)
      : this.setState({failedLogin: true});
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
    const {username, password, failedLogin} = this.state;

    return (
      <div>
        <TextField label='Name'
                   type='search'
                   error={failedLogin}
                   value={username}
                   onChange={({target}) => this.setState({username: target.value})}
                   margin='normal'
                   fullWidth
        />
        <TextField label='Password'
                   type='password'
                   error={failedLogin}
                   value={password}
                   onChange={({target}) => this.setState({password: target.value})}
                   margin='normal'
                   fullWidth
        />

        <WrapButtons>
          <LoginBtn variant='outlined' color='primary' size='large'
                    disabled={!username.length || !password.length}
                    onClick={() => this.handleLogin(username, password)}>
            Login
          </LoginBtn>
        </WrapButtons>

        <Typography variant='body2' color='textSecondary'>Or login via</Typography>
        <WrapButtons>
          <FacebookProvider appId='1793837897321083'>
            <LoginFacebook
              scope='email'
              onResponse={this.handleLoginFacebook}
              onError={this.handleLoginFacebook}
            >
              <FacebookLoginBtn>
                <FacebookIcon viewBox='0 0 130 130' style={{color: muiPalette.common.white}}/>
                <Typography variant='button' color='inherit'>Facebook</Typography>
              </FacebookLoginBtn>
            </LoginFacebook>
          </FacebookProvider>
          <GoogleLoginBtn
            clientId='999108389649-2kil7c0ipbmf5q2hcjnl35alln5t7cko.apps.googleusercontent.com'
            onSuccess={this.handleLoginGoogle}
            onFailure={this.handleLoginGoogle}
            style={{}}
          >
            <GoogleIcon viewBox='0 0 520 520' style={{color: muiPalette.common.white}}/>
            <Typography variant='button' color='inherit'>Google</Typography>
          </GoogleLoginBtn>
        </WrapButtons>

        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={failedLogin}
          onClose={() => this.setState({failedLogin: false})}
          ContentProps={{'aria-describedby': 'login__err-msg'}}
          message={<span id='login__err-msg'>Name or Password incorrect</span>}
        />
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