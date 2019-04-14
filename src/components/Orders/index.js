/** @format */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Orders from 'components/Orders/Orders'
import OrderCreate from 'components/Orders/OrderCreate'
import OrderUpdate from 'components/Orders/OrderUpdate'
//import OrderWizard from 'components/Orders/OrderWizard'

export default ({ match }) => (
  <React.Fragment>
    <Switch>
      <Route path={`${match.path}/builder/:orderId/update`} component={OrderUpdate} />
      {/*<Route path={`${match.path}/builder/:orderId/wizard`} component={OrderWizard} />*/}
      <Route path={`${match.path}`} component={Orders} />
    </Switch>
    <Route path={`${match.path}/create`} component={OrderCreate} />
  </React.Fragment>
)
