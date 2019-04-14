/** @format */

import React from 'react'
import 'App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Query } from 'components'

import { getAppContext } from 'api/users.graphql'

import Head from 'Head'
import CssBaseline from '@material-ui/core/CssBaseline'

import AuthModule from 'components/Auth'
import UserModule from 'components/User'

import AppContext from 'AppContext'

const App = () => (
  <div className="App">
    <CssBaseline />
    <Query query={getAppContext}>
      {({ user }) => (
        <AppContext.Provider value={{ user }}>
          <Head />
          <Switch>
            <Route path={`/auth`} render={props => (user ? <Redirect from={props.location.pathname} to="/dashboard" /> : <AuthModule {...props} />)} />
            <Route
              path={`/`}
              render={props =>
                user ? (
                  <UserModule {...props} />
                ) : (
                  <Redirect
                    from={props.location.pathname}
                    to={{
                      pathname: '/auth/login',
                      state: { referrer: props.location.pathname }
                    }}
                  />
                )
              }
            />
          </Switch>
        </AppContext.Provider>
      )}
    </Query>
  </div>
)

export default App
