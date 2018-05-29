import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {screen} from '../../redux-core/types';
import {navigate} from '../../redux-core/actions/navigate';
import {addUser} from '../../redux-core/actions/user';

import InputField from '../../components/InputField';

class RegisterForm extends React.PureComponent {
  state = {
    name: '',
    email: '',
    company: '',
    username: '',
    password: '',
    passwordVerification: '',
  };

  handleRegister = () => {
    const {name, email, company, username, password} = this.state;
    const {addUser, navigate} = this.props;

    const newUser = {
      name,
      email,
      company,
      username,
      password,
    };

    addUser(newUser);
    // TODO when response will be valid json
    // go to magic trick login
    // navigate(screen.ROOT_SCREEN);
  };

  validateForm = () => {
    const {name, email, company, username, password, passwordVerification} = this.state;

    const emailValid = this._validEmail(email);
    const nameValid = this._validName(name);
    const companyValid = this._validName(company);
    const usernameValid = this._validName(username);
    const passwordValid = this._validPassword(password);
    const passwordVerified = password === passwordVerification;

    return (nameValid && emailValid && companyValid && usernameValid && passwordValid && passwordVerified);
  };

  _validEmail = email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm.test(email);
  _validName = name => /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/igm.test(name);
  _validPassword = password => /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/igm.test(password);

  render() {
    const {goToLogin} = this.props;
    const {name, email, company, password, passwordVerification, username} = this.state;

    const validForm = Object.values(this.state)
      .every(field => field.length) && this.validateForm();

    return (
      <div className='Register'>
        <form>
          <InputField id={'reg__name'} label={'Name'}
                      placeholder={'Enter name with 2-20 chars'}
                      type={'text'} value={name}
                      handleChange={({target}) => this.setState({name: target.value})}
          />
          <InputField id={'reg__email'} label={'Email address'}
                      placeholder={'Enter email: email@example.com'}
                      type={'email'} value={email}
                      handleChange={({target}) => this.setState({email: target.value})}
          />
          <InputField id={'reg__company'} label={'Company name'}
                      placeholder={'Enter company name with 2-20 chars'}
                      type={'text'} value={company}
                      handleChange={({target}) => this.setState({company: target.value})}
          />
          <InputField id={'reg__username'} label={'User name'}
                      placeholder={'Enter user name with 2-20 chars'}
                      type={'text'} value={username}
                      handleChange={({target}) => this.setState({username: target.value})}
          />
          <InputField id={'reg__password'} label={'Password'}
                      placeholder={'Enter password: UpperCase, LowerCase, Number/SpecialChar and min 6 chars'}
                      type={'password'} value={password}
                      handleChange={({target}) => this.setState({password: target.value})}
          />
          <InputField id={'reg__password-verification'} label={'Verify Password'}
                      placeholder={'Verify password'}
                      type={'password'} value={passwordVerification}
                      handleChange={({target}) => this.setState({passwordVerification: target.value})}
          />
          <div className='tooltip'>
            <button onClick={this.handleRegister}>
              Register
              {!validForm &&
              <span className='tooltiptext'>
                All fields should be valid
              </span>
              }
            </button>
          </div>

          <button
                  onClick={goToLogin}>
            Already have account? Login
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
  addUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(RegisterForm);