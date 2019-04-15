/** @format */

import { createAction } from 'redux-actions'
import localforage from 'localforage'

export const toggleSider = createAction('TOGGLE_SIDER')
export const hideSider = createAction('HIDE_SIDER')
export const showSider = createAction('SHOW_SIDER')

/*
 * { token, userId, tokenExpires }
 */
export const onLogin = async ({ token }) => {
  await localforage.setItem('loginToken', token)
  window.location.href = '/dashboard'
}

/*
 * { token, userId, tokenExpires }
 */
export const onSignup = (data, enqueueSnackbar) => {
  enqueueSnackbar('You have successfully registered', { variant: 'success' })
  onLogin(data)
}

/*
 * { token }
 */
export const onForgotPwd = (data, enqueueSnackbar) => {
  enqueueSnackbar('We sent you an email with instructions for reseting your password', { variant: 'success' })
}

/*
 * { token, userId, tokenExpires }
 */
export const onResetPwd = (data, enqueueSnackbar) => {
  enqueueSnackbar('You successfully reset your password', { variant: 'success' })
  onLogin(data)
}

export const logout = async () => {
  await localforage.removeItem('loginToken')
  window.location.href = '/auth/login'
}

export const onSubmitSuccess = (result, dispatch, { enqueueSnackbar }) => {
  enqueueSnackbar('You have successfully saved', { variant: 'success' })
}

export const onSubmitFail = (errors, dispatch, submitError, { enqueueSnackbar }) => {
  const { graphQLErrors = [], message } = submitError || {}
  console.log('onSubmitFail', errors, submitError)
  if (graphQLErrors.length) {
    submitError.graphQLErrors.map(error => {
      return enqueueSnackbar(error.message, { variant: 'error' })
    })
  } else if (errors && errors._error) {
    enqueueSnackbar(errors._error, { variant: 'error' })
  } else if (message) {
    enqueueSnackbar(message, { variant: 'error' })
  }
}

export const onError = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(error => {
      console.log(error)
      return graphQLErrors
    })
  }
  if (networkError && !graphQLErrors) {
    console.log(networkError)
  }
}

export const getLoginToken = () => localforage.getItem('loginToken')

export const absoluteUrl = (path = '') => `${process.env.ROOT_URL}/${path}`
export const isDevelopment = () => process.env.NODE_ENV !== 'production'
export const isProduction = () => process.env.NODE_ENV === 'production'
