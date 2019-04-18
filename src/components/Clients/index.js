/** @format */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Clients from './Clients'
//import Client from './Client'
import ClientCreate from './ClientCreate'

export default ({ match }) => (
  <React.Fragment>
    <Switch>
      {/*<Route path={`${match.path}/builder/:productId`} component={Product} />*/}
      <Route path={`${match.path}`} component={Clients} />
    </Switch>
    <Switch>
      <Route path={`${match.path}/create`} component={ClientCreate} />
    </Switch>
  </React.Fragment>
)
