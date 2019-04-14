/** @format */

import React from 'react'
import { compose } from 'recompose'
import { Switch, Route, withRouter } from 'react-router-dom'

import Dashboard from './Dashboard'

const Agency = ({ match }) => (
  <React.Fragment>
    <Switch>
      <Route path={`${match.path}`} component={Dashboard} />
    </Switch>
  </React.Fragment>
)

const enhance = compose(withRouter)

export default enhance(Agency)
