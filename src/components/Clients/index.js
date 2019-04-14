/** @format */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Clients from './Clients'
import Client from './Client'
import ClientCreate from './ClientCreate'

export default ({ match }) => (
  <React.Fragment>
    <Switch>
      <Route path={`${match.path}/create`} component={ClientCreate} />
      <Route path={`${match.path}/:userId`} component={Client} />
      <Route path={`${match.path}`} component={Clients} />
    </Switch>
  </React.Fragment>
)
