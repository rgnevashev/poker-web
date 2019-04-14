/** @format */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Nav from 'components/Nav'

import Plans from 'components/Plans'
import ProductConfigure from './ProductConfigure'

export default ({ match, history, location }) => (
  <React.Fragment>
    <Nav
      color="info"
      items={[{ key: 'configure', title: 'Configure', to: `${match.url}/configure` }, { key: 'plans', title: 'Plans', to: `${match.url}/plans` }]}
      activeKey={location.pathname.split('/')[4]}
    />
    <Switch>
      <Route path={`${match.path}/configure`} component={ProductConfigure} />
      <Route path={`${match.path}/plans`} component={Plans} />
    </Switch>
  </React.Fragment>
)
