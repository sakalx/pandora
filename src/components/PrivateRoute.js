import React from 'react';
import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

import LoginScreen from 'root/scenes/login-page';

const PrivateRoute = ({component: Component, user, ...rest}) => {
  return (
    user.id
      ? <Route{...rest} render={props => <Component {...props}/>}/>
      : <LoginScreen/>
  )
};

const mapStateToProps = ({user}) => ({
  user,
});

export default connect(mapStateToProps)(PrivateRoute)