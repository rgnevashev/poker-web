/** @format */

import React from 'react'
import { Route } from 'react-router-dom'

import AppContext from 'AppContext'

import Admin from './Admin'
import Client from './Client'
import Agency from './Agency'

export default ({ match }) => (
  <React.Fragment>
    <AppContext.Consumer>
      {({ user }) => {
        let Component = null
        if (user && user.accountType === 'admin') {
          Component = Admin
        } else if (user && user.accountType === 'agency') {
          Component = Agency
        } else {
          Component = Client
        }
        return (
          <React.Fragment>
            <Route path={`${match.path}`} component={Component} />
          </React.Fragment>
        )
      }}
    </AppContext.Consumer>
  </React.Fragment>
)

/*

    <Switch>
      <Route path={`${match.path}/page/:id`} component={Page} />
      <Route path={`${match.path}`} component={Pages} />
    </Switch>
*/
