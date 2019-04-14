/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import { ApolloProvider } from 'react-apollo'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter as RouterProvider } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { SnackbarProvider } from 'notistack'

// Apollo
import createApolloClient from 'apollo'

// Store
import createStore from 'store'

// Theme
import createTheme from 'styles/createTheme'

import App from 'App'

const client = createApolloClient(window.__APOLLO_STATE__)
const store = createStore(window.__INITIAL_STATE__)
const theme = createTheme()

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <RouterProvider>
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </MuiThemeProvider>
      </RouterProvider>
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

// import * as serviceWorker from './serviceWorker'
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
