/** @format */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Nav from 'components/Nav'

import Profile from './Profile'
import Company from './Company'
import Billing from './Billing'
import Notifications from './Notifications'
import Services from './Services'
import MediaFiles from 'components/MediaFiles'

import AppContext from 'AppContext'

export default ({ match, location }) => (
  <AppContext.Consumer>
    {({ user }) => (
      <React.Fragment>
        <Nav
          color="info"
          items={[
            { key: 'profile', title: 'My Profile', to: `${match.url}/profile` },
            { key: 'company', title: 'My Company', to: `${match.url}/company` },
            { key: 'billing', title: 'Billing', to: `${match.url}/billing` },
            { key: 'notifications', title: 'Notifications', to: `${match.url}/notifications` },
            { key: 'files', title: 'Media Files', to: `${match.url}/files` },
            { key: 'services', title: 'Services', to: `${match.url}/services`, skip: user.accountType === 'agencyClient' }
            //{ key: 'credits', title: 'Credits', to: `${match.url}/credits` }
          ]}
          activeKey={location.pathname.split('/')[2] || 'profile'}
        />
        <Switch>
          <Redirect exact from={match.path} to={`${match.path}/profile`} />
          <Route path={`${match.path}/profile`} component={Profile} />
          <Route path={`${match.path}/company`} component={Company} />
          <Route path={`${match.path}/billing`} component={Billing} />
          <Route path={`${match.path}/notifications`} component={Notifications} />
          <Route path={`${match.path}/files`} component={MediaFiles} />
          <Route path={`${match.path}/services`} component={Services} />
        </Switch>
      </React.Fragment>
    )}
  </AppContext.Consumer>
)
