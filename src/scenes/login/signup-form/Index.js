import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {screen} from 'root/redux-core/types';
import {navigate} from 'root/redux-core/actions/navigate';
import {addUser} from 'root/redux-core/actions/user';

import {camelCase, stringToCamelCase} from 'root/helpers/camel-case';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



{/*<TextField label={getSteps(step)}
           type='search'
           value={this.state[Company].value}
           onChange={({target}) => console.log(target.value)}
           margin='normal'
           fullWidth
/>;*/}

const getStepContent = step => {
  switch (step) {
    case 0:
      return   'vdrv';
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
};

// Use 8 or more characters with a mix of letters, numbers & symbols
// You can use letters, numbers & periods

class SignUpForm extends React.PureComponent {
  state = {
    steps: {
      // index 0 = value, index 1 = failed / error
      fullName: ['', null],
      userName: ['', null],
      email: ['', null],
      company: ['', null],
      password: ['', null],
      confirmPassword: ['', null],
    },
    activeStep: 0,
  };

  getSteps = () => Object.keys(this.state.steps).map(camelCase);

  getStepContent = label => {

    const step = stringToCamelCase(label);

    return (
      <TextField label={label}
                 type='search'
                 value={this.state.steps[step][0]}
                 onChange={({target}) => this.setState({
                   steps: {
                     ...this.state.steps,
                     [step]: [target.value, null], //   userName: ['', null],
                   }
                 })}
                 margin='normal'
                 fullWidth
      />
    )

/*    if (label === 'Password') {
      return (
        <button onClick={() => label()}>v</button>
      )
    }*/

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


  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepFailed = step => {
    return step === 1;
  };

  render() {
    /*  const {name, email, company, password, passwordVerification, username} = this.state;

      const validForm = Object.values(this.state)
        .every(field => field.length) && this.validateForm();*/

    const steps = this.getSteps();
    const {activeStep} = this.state;

    console.log(this.getSteps());
    console.log(this.state);

    return (
      <div>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {steps.map((label, index) => {


            const labelProps = {};

            labelProps.optional = (
              <Typography variant="caption" color="error">
                Alert message
              </Typography>
            );
            if (this.isStepFailed(index)) {
              labelProps.error = true;
            }
            return (
              <Step key={label} >
                <StepLabel {...labelProps}>{label}</StepLabel>
                <StepContent>
                  {this.getStepContent(label)}
                  <div>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={this.handleNext}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            )
          })
          }
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
  addUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(SignUpForm);


{/*
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
  </form>
</div>*/
}
