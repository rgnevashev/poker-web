/** @format */

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import localforage from 'localforage'

import { onError } from 'api/actions'

export default (initialState = {}) => {
  const uri = `${process.env.REACT_APP_API_URL}/graphql`
  const cache = new InMemoryCache({
    addTypename: false,
    dataIdFromObject: object => object.id || null
  }).restore(initialState)

  const client = new ApolloClient({
    uri,
    cache,
    onError,
    async request(operation) {
      const token = await localforage.getItem('loginToken')
      const headers = {}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
      return operation.setContext({ headers })
    }
  })

  return client
}
