/** @format */

import React from 'react'
import { Query, FormCard, Field } from 'components'
import { TextField, Checkbox } from 'lib/redux-form-material-ui'

import { getProduct, updateProduct } from 'api/products.graphql'

import withStyles from '@material-ui/core/styles/withStyles'

import { required } from 'lib/validators'

const ProductConfigure = ({ classes, match }) => (
  <React.Fragment>
    <Query query={getProduct} variables={match.params}>
      {({ product }) => (
        <React.Fragment>
          <FormCard
            title={product.name}
            subtitle="Complete product"
            form="ProductConfigure"
            mutation={updateProduct}
            refetchQueries={['getProducts']}
            initialValues={product}
            success="Product updated successfully"
          >
            {({ doc, invalid, submitting }) => (
              <React.Fragment>
                <Field name="name" component={TextField} label="Page Name" validate={[required()]} />
                <Field name="active" component={Checkbox} label="Active" />
              </React.Fragment>
            )}
          </FormCard>
        </React.Fragment>
      )}
    </Query>
  </React.Fragment>
)

const styles = theme => ({
  root: {}
})

export default withStyles(styles)(ProductConfigure)
