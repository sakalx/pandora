import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {screen} from 'root/redux-core/types';
import {navigate} from 'root/redux-core/actions/navigate';
import {addUser} from 'root/redux-core/actions/user';

import {camelCaseToString} from 'root/helpers/camel-case';

import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class SignUpForm extends React.PureComponent {
  state = {
    steps: {
      // index 0 === value, index 1 === error, index 2 === error Message,
      fullName: ['', false, 'You can use letters & numbers'],
      userName: ['', false, 'You can use letters & numbers'],
      email: ['', false, 'email@example.com'],
      company: ['', false, 'You can use letters & numbers'],
      password: ['', false, 'Use 6 or more characters with a mix of letters, numbers & symbols'],
      confirmPassword: ['', false, 'Those passwords didn\'t match. Try again.'],
    },
    activeStep: 0,
  };

  handleSignUp = () => {
    const {name, email, company, username, password} = this.state;
    const {addUser, navigate} = this.props;

    const newUser = {
      name,
      username,
      email,
      company,
      password,
    };

    // TODO when response will be valid json
    console.log('TODO when response will be valid json');
    //addUser(newUser);
    // go to magic trick login
    // navigate(screen.ROOT_SCREEN);
  };

  handleNext = step => {
    const {steps, activeStep} = this.state;
    this._stepValidation(step);

    activeStep === Object.keys(steps).length - 1
      ? this.handleSignUp()
      : this.setState({activeStep: this.state.activeStep + 1})
  };

  isValidLength = step => {
    const {steps} = this.state;
    const valueLength = steps[step][0].length;

    switch (step) {
      case 'fullName':
        return valueLength > 6 && valueLength < 20;
      case 'userName':
        return valueLength > 2 && valueLength < 20;
      case 'email':
        return valueLength > 5 && valueLength < 20;
      case 'company':
        return valueLength > 3 && valueLength < 20;
      case 'password':
        return valueLength > 5 && valueLength < 20;
      case 'confirmPassword':
        return valueLength > 5 && valueLength < 20;
    }
  };

  _stepValidation = step => {
    const {steps} = this.state;
    const [, , errMsg] = steps[step];
    const [stepValue] = steps[step];

    const validString = string => /^[a-zA-Z][a-zA-Z0-9-\s]{1,20}$/igm.test(string);
    const validEmail = email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm.test(email);
    const validPassword = password => /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/igm.test(password);
    const validConfirmPassword = stepValue => steps.password[0] === stepValue;

    const validation = (step, isValid) => this.setState({
      steps: {
        ...steps,
        [step]: [stepValue, !isValid(stepValue), errMsg]
      }
    });

    switch (step) {
      case 'fullName':
      case 'userName':
      case 'company':
        validation(step, validString);
        break;
      case 'email':
        validation(step, validEmail);
        break;
      case 'password':
        validation(step, validPassword);
        break;
      case 'confirmPassword':
        validation(step, validConfirmPassword);
    }
  };

  renderStepContent = step => {
    const {steps} = this.state;
    const [, ...stepParam] = steps[step];
    const [stepValue] = this.state.steps[step];
    const type = step === 'password' || step === 'confirmPassword'
      ? 'password'
      : 'search';

    return (
      <TextField fullWidth
                 margin='normal'
                 onChange={({target}) => this.setState({
                   steps: {
                     ...steps,
                     [step]: [target.value, ...stepParam],
                   }
                 })}
                 type={type}
                 value={stepValue}
                 label={camelCaseToString(step)}
      />
    )
  };

  renderStepLabel = step => {
    const [stepValue] = this.state.steps[step];
    const passwordLabel = value => value.replace(/./gi, '*');

    const label = value =>
      <Typography align='left'
                  color={stepValue.length ? 'primary' : 'textSecondary'}
                  variant='subheading'>
        {value}
      </Typography>;

    return !stepValue.length ? label(camelCaseToString(step))
      : step === 'password' || step === 'confirmPassword'
        ? label(passwordLabel(stepValue))
        : label(stepValue);
  };

  render() {
    const {activeStep, steps} = this.state;
    const listOfSteps = Object.keys(steps);

    return (
      <section>
        <Stepper activeStep={activeStep} orientation='vertical'>
          {listOfSteps.map(step => {
            const labelProps = {};
            const [, stepError] = steps[step];
            const [, , stepErrorMsg] = steps[step];

            if (stepError) {
              labelProps.error = true;
              labelProps.optional = (
                <Typography color='error' variant='caption'>
                  {stepErrorMsg}
                </Typography>
              );
            }
            return (
              <Step key={step}>
                <StepLabel {...labelProps}>
                  {this.renderStepLabel(step)}
                </StepLabel>
                <StepContent>
                  {this.renderStepContent(step)}
                  <div>
                    {activeStep !== 0
                    && <Button onClick={() => this.setState({activeStep: activeStep - 1})}>
                      Back
                    </Button>}
                    <Button color='primary'
                            disabled={!this.isValidLength(step)}
                            onClick={() => this.handleNext(step)}
                            variant='raised'>
                      {activeStep === listOfSteps.length - 1 ? 'SignUp' : 'Next'}
                    </Button>
                  </div>
                </StepContent>
              </Step>
            )
          })
          }
        </Stepper>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  navigate,
  addUser,
}, dispatch);

export default connect(null, mapDispatchToProps)(SignUpForm);