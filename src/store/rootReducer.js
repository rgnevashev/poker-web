/** @format */

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

// import appReducer from './appReducer'

const rootReducer = combineReducers({
  form: formReducer
})

export default rootReducer
