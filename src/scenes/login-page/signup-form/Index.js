import React from 'react';

import {createUser} from 'root/firebase-core/authentication';
import {setUser} from 'root/firebase-core/collections/users';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleSnackbar} from 'root/redux-core/actions/notification';

import {camelCaseToString} from 'root/helpers/camel-case';
import {validatorEmail, validatorName, validatorPassword} from 'root/helpers/validator';

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
      firstName: ['serhii', false, 'You can use letters & numbers'],
      lastName: ['sakal', false, 'You can use letters & numbers'],
      email: ['adsddaw@mafa.is', false, 'email@example.com'],
      password: ['123456q', false, 'Use 6 or more characters with a mix of letters, numbers & symbols'],
      confirmPassword: ['123456q', false, 'Those passwords didn\'t match. Try again.'],
    },
    activeStep: 0,
  };

  handleSignUp = () => {
    const {toggleSnackbar} = this.props;
    const {firstName, lastName, email, password} = this.state.steps;

    const newUser = {
      email: email[0],
      firstName: firstName[0],
      lastName: lastName[0],
    };

    createUser(email[0], password[0])
      .then(() => setUser(newUser))
      .then(() => toggleSnackbar(`Welcome ${firstName[0]} ✨`))
      .catch(error => {
        toggleSnackbar(error.message);
        console.error(error)
      });
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
      case 'firstName':
        return valueLength > 3 && valueLength < 12;
      case 'lastName':
        return valueLength > 3 && valueLength < 12;
      case 'email':
        return valueLength > 5 && valueLength < 20;
      case 'password':
        return valueLength > 5 && valueLength < 12;
      case 'confirmPassword':
        return valueLength > 5 && valueLength < 12;
    }
  };

  _stepValidation = step => {
    const {steps} = this.state;
    const [, , errMsg] = steps[step];
    const [stepValue] = steps[step];
    const validConfirmPassword = stepValue => steps.password[0] === stepValue;

    const validation = (step, isValid) => this.setState({
      steps: {
        ...steps,
        [step]: [stepValue, !isValid(stepValue), errMsg]
      }
    });

    switch (step) {
      case 'firstName':
      case 'lastName':
        validation(step, validatorName);
        break;
      case 'email':
        validation(step, validatorEmail);
        break;
      case 'password':
        validation(step, validatorPassword);
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
  toggleSnackbar
}, dispatch);

export default connect(null, mapDispatchToProps)(SignUpForm);