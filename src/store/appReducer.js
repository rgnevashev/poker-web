/** @format */

import { handleActions as createReducer } from 'redux-actions'

import { toggleSider, hideSider, showSider } from 'api/actions'

const appReducer = createReducer(
  {
    [toggleSider]: state => ({ ...state, siderCollapsed: !state.siderCollapsed }),
    [showSider]: state => ({ ...state, siderCollapsed: false }),
    [hideSider]: state => ({ ...state, siderCollapsed: true })
  },
  { siderCollapsed: false }
)

export default appReducer
