import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleSnackbar} from 'root/redux-core/actions/notification';

import {screen} from 'root/redux-core/types';
import {navigate} from 'root/redux-core/actions/navigate';
import {addUser, admitUser} from 'root/redux-core/actions/user';

import FacebookProvider, {Login as LoginFacebook} from 'react-facebook';

import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {muiPalette} from "root/theme";
import {
  FacebookLoginBtn,
  GoogleLoginBtn,
  LoginBtn,
  Title,
  Wrap,
  WrapButtons,
} from './style';

import {FacebookIcon, GoogleIcon} from 'root/icons';

class LoginForm extends React.PureComponent {
  state = {
    name: '',
    password: '',
  };

  handleLogin = (name, password) => {
    const {toggleSnackbar} = this.props;
    const authorizedUser = this._isUserAuthorized(name, password);

    authorizedUser
      ? this._admitUser(authorizedUser)
      : toggleSnackbar('Sorry, you entered an incorrect email address or password.');
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

      // TODO when response will be valid json
      console.log('TODO when response will be valid json')
      //addUser(newUser);
      // go to magic trick login
      // navigate(screen.ROOT_SCREEN);
    }
  };

  renderInputField = value =>
    <TextField error={this.props.notification.showSnackBar}
               fullWidth
               margin='normal'
               onChange={({target}) => this.setState({[value]: target.value})}
               type={value === 'password' ? 'password' : 'search'}
               value={this.state[value]}
               label={value[0].toUpperCase() + value.slice(1)}
    />;

  render() {
    const {name, password} = this.state;

    return (
      <Wrap>
        <Title variant='display2'>
          {[...'Login'].map((char, index) =>
            <Fade in={true} key={index.toString()} timeout={5000 + (index*2000)}>
              <span>{char}</span>
            </Fade>
          )}
        </Title>
        {this.renderInputField('name')}
        {this.renderInputField('password')}

        <Collapse in={!!(name.length && password.length)}>
          <WrapButtons>
            <LoginBtn onClick={() => this.handleLogin(name, password)}
                      color='primary' size='large' variant='outlined'>
              Login
            </LoginBtn>
          </WrapButtons>
        </Collapse>

        <Typography color='textSecondary' variant='body2'>Or login via</Typography>
        <WrapButtons>
          <Slide direction='down' in={true} timeout={500}>
            <FacebookProvider appId='1793837897321083'>
              <LoginFacebook
                onError={this.handleLoginFacebook}
                onResponse={this.handleLoginFacebook}
                scope='email'>
                <FacebookLoginBtn>
                  <FacebookIcon viewBox='0 0 130 130' style={{color: muiPalette.common.white}}/>
                  <Typography variant='button' color='inherit'>Facebook</Typography>
                </FacebookLoginBtn>
              </LoginFacebook>
            </FacebookProvider>
          </Slide>
          <Slide timeout={700} direction='down' in={true}>
            <GoogleLoginBtn clientId='999108389649-2kil7c0ipbmf5q2hcjnl35alln5t7cko.apps.googleusercontent.com'
                            onFailure={this.handleLoginGoogle}
                            onSuccess={this.handleLoginGoogle}
                            style={{}}>
              <GoogleIcon style={{color: muiPalette.common.white}} viewBox='0 0 520 520'/>
              <Typography color='inherit' variant='button'>Google</Typography>
            </GoogleLoginBtn>
          </Slide>
        </WrapButtons>
      </Wrap>
    )
  }
}

const mapStateToProps = ({userData, notification}) => ({
  notification,
  userData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addUser,
  admitUser,
  navigate,
  toggleSnackbar,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);