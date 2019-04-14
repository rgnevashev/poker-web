/** @format */

import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Login from './Login'
//import SignUp from './SignUp'
import ForgotPwd from './ForgotPwd'
import ResetPwd from './ResetPwd'

const Auth = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}`} to={`${match.url}/login`} />
    <Route path={`${match.path}/login`} component={Login} />
    <Route path={`${match.path}/forgot-password`} component={ForgotPwd} />
    <Route path={`${match.path}/reset-password/:token`} component={ResetPwd} />
  </Switch>
)

export default Auth
