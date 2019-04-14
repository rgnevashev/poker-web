/** @format */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Plans from 'components/Plans/Plans'
import PlanCreate from 'components/Plans/PlanCreate'
import PlanUpdate from 'components/Plans/PlanUpdate'

export default ({ match }) => (
  <React.Fragment>
    <Switch>
      <Route path={`${match.path}`} component={Plans} />
    </Switch>
    <Route path={`${match.path}/create`} component={PlanCreate} />
    <Route path={`${match.path}/:planId/update`} component={PlanUpdate} />
  </React.Fragment>
)
