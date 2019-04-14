/** @format */

import React from 'react'

import { compose } from 'recompose'
import AppContext from 'AppContext'

export default WrappedComponent => {
  class WithUserContext extends React.Component {
    render() {
      return (
        <div>
          <AppContext.Consumer>{({ user }) => <WrappedComponent user={user} {...this.props} />}</AppContext.Consumer>
        </div>
      )
    }
  }
  return compose()(WithUserContext)
}
