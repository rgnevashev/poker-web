/** @format */

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Nav from 'components/Nav'

import Profile from 'components/Account/Profile'
import Company from 'components/Account/Company'
import Billing from 'components/Account/Billing'
import Notifications from 'components/Account/Notifications'
import ConversationalPages from 'components/ConversationalPages'
import Orders from 'components/Orders'
import Invoices from 'components/Invoices'
import Subscriptions from 'components/Subscriptions'
import MediaFiles from 'components/MediaFiles'

export default ({ match, history, location }) => (
  <React.Fragment>
    <Nav
      color="info"
      items={[
        { key: 'profile', title: 'Profile', to: `${match.url}/profile` },
        { key: 'company', title: 'Company', to: `${match.url}/company` },
        { key: 'billing', title: 'Billing', to: `${match.url}/billing` },
        { key: 'files', title: 'Media Files', to: `${match.url}/files` },
        { key: 'orders', title: 'Orders', to: `${match.url}/orders` },
        { key: 'notifications', title: 'Notifications', to: `${match.url}/notifications` },
        { key: 'pages', title: 'Conversational Pages', to: `${match.url}/pages` },
        { key: 'invoices', title: 'Invoices', to: `${match.url}/invoices` },
        { key: 'subscriptions', title: 'Subscriptions', to: `${match.url}/subscriptions` }
      ]}
      activeKey={location.pathname.split('/')[3]}
    />
    <Switch>
      <Route path={`${match.path}/profile`} component={Profile} />
      <Route path={`${match.path}/company`} component={Company} />
      <Route path={`${match.path}/billing`} component={Billing} />
      <Route path={`${match.path}/notifications`} component={Notifications} />
      <Route path={`${match.path}/orders`} component={Orders} />
      <Route path={`${match.path}/invoices`} component={Invoices} />
      <Route path={`${match.path}/pages`} component={ConversationalPages} />
      <Route path={`${match.path}/subscriptions`} component={Subscriptions} />
      <Route path={`${match.path}/files`} component={MediaFiles} />
    </Switch>
  </React.Fragment>
)
