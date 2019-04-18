/** @format */

import React from 'react'
import { Query, FormDialog, Field } from 'components'
import { TextField } from 'lib/fields'

import { getDataForProductCreation, createProduct } from 'api/products.graphql'

import withStyles from '@material-ui/core/styles/withStyles'

import { required, length } from 'lib/validators'

const ProductCreate = ({ classes, match }) => (
  <Query query={getDataForProductCreation} variables={match.params}>
    {({ agencies }) => (
      <FormDialog
        title="Create Product"
        form="ProductCreate"
        mutation={createProduct}
        refetchQueries={['getProducts']}
        btnSubmitText="Create"
        success="Product created successfully"
      >
        {({ doc, invalid, submitting }) => (
          <React.Fragment>
            <Field name="name" component={TextField} label="Product Name" validate={[required(), length({ min: 2 })]} />
          </React.Fragment>
        )}
      </FormDialog>
    )}
  </Query>
)

const styles = () => ({
  root: {}
})

export default withStyles(styles)(ProductCreate)
