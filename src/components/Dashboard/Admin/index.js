/** @format */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from './Dashboard'

const Admin = ({ match }) => (
  <React.Fragment>
    <Switch>
      <Route path={`${match.path}`} component={Dashboard} />
    </Switch>
  </React.Fragment>
)

export default Admin
