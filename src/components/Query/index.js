/** @format */

import React from 'react'
import { Query as QueryApollo } from 'react-apollo'

const Query = ({ children, loader = null, ...passedProps }) => (
  <QueryApollo fetchPolicy="cache-and-network" {...passedProps}>
    {queryResult => {
      if (queryResult.loading) {
        return loader
      }
      if (queryResult.error) {
        return null
      }
      return children({ ...queryResult, ...(queryResult.data || {}) })
    }}
  </QueryApollo>
)

export default Query
