/** @format */

import React from 'react'
import { compose } from 'recompose'
import { Mutation } from 'components'
import withSweetAlert from 'lib/withSweetAlert'

import { getProducts, removeProduct, removeProducts } from 'api/products.graphql'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import CheckboxTable from 'lib/tables/CheckboxTable'

const Products = ({ classes, history, match, logginAs, loginAs, alert }) => (
  <React.Fragment>
    <Mutation mutation={removeProduct} refetchQueries={['getProducts']}>
      {(remove, { loading: loadingRemove }) => (
        <Mutation mutation={removeProducts} refetchQueries={['getProducts']}>
          {(removeMany, { loading: loadingRemove }) => (
            <CheckboxTable
              query={getProducts}
              initialVariables={{ sorted: [{ id: 'createdAt', desc: true }] }}
              columns={[
                {
                  Header: 'Name',
                  accessor: 'name'
                },
                {
                  Header: 'Actions',
                  sortable: false,
                  filterable: false,
                  accessor: 'id',
                  Cell: ({ original: product }) => (
                    <div>
                      <IconButton onClick={() => history.push(`${match.url}/builder/${product.id}/configure`)} title="Edit Product">
                        <Icon fontSize="small">edit</Icon>
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => alert.confirm('', 'Are you sure you want to delete this Product?', () => remove({ variables: { id: product.id } }))}
                        title="Remove Product"
                        disabled={loadingRemove}
                      >
                        <Icon fontSize="small">delete</Icon>
                      </IconButton>
                    </div>
                  )
                }
              ]}
              actions={[
                <Button key="create" variant="contained" color="primary" onClick={() => history.push(`${match.url}/create`)}>
                  <Icon>add</Icon>
                  Create Product
                </Button>
              ]}
              onDeleteAll={selection => removeMany({ variables: { ids: selection } })}
            />
          )}
        </Mutation>
      )}
    </Mutation>
  </React.Fragment>
)

const styles = theme => ({
  root: {}
})

const enhance = compose(
  withSweetAlert,
  withStyles(styles)
)

export default enhance(Products)
