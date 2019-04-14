/** @format */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Products from './Products'
import Product from './Product'
import ProductCreate from './ProductCreate'

export default ({ match }) => (
  <React.Fragment>
    <Switch>
      <Route path={`${match.path}/builder/:productId`} component={Product} />
      <Route path={`${match.path}`} component={Products} />
    </Switch>
    <Switch>
      <Route path={`${match.path}/create`} component={ProductCreate} />
    </Switch>
  </React.Fragment>
)
