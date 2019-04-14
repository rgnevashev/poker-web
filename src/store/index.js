/** @format */

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './rootReducer'

export default (initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  return store
}
