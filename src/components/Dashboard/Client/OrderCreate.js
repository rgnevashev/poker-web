/** @format */

import React from 'react'
import { compose } from 'recompose'
import { Query, Form, Field } from 'components'
import { TextField } from 'lib/redux-form-material-ui'

import { purchaseProduct, getDataForPurchaseProduct } from 'api/products.graphql'

import withStyles from '@material-ui/core/styles/withStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Button from 'components/CustomButtons/Button'

import { budgetOptions } from 'variables/options'

import { required, numericality } from 'lib/validators'

const OrderCreate = ({ classes, fullScreen, history }) => (
  <Query query={getDataForPurchaseProduct}>
    {({ products }) => (
      <React.Fragment>
        <Dialog fullScreen={fullScreen} open fullWidth aria-labelledby="responsive-dialog-title">
          <Form
            form="OrderCreate"
            mutation={purchaseProduct}
            refetchQueries={['getOrders']}
            onSubmit={(mutation, data) => mutation({ variables: { product: data } })}
            onSubmitSuccess={(result, dispatch, { history, enqueueSnackbar }) => {
              enqueueSnackbar('You have created order successfully', { variant: 'success' })
              history.push('/dashboard')
            }}
          >
            {({ doc, invalid, submitting, enqueueSnackbar }) => (
              <React.Fragment>
                <DialogTitle id="responsive-dialog-title">Create New Order</DialogTitle>
                <DialogContent>
                  <Field
                    name="productId"
                    component={TextField}
                    label="Select Product"
                    options={Array.from(products.data || []).map(p => ({ label: p.name, value: p.id }))}
                    validate={[required()]}
                    select
                  />
                  <Field
                    name="budget"
                    component={TextField}
                    label="Choose your 30 Day LeadFollow Campaign Budget"
                    options={budgetOptions}
                    select
                    validate={[required(), numericality()]}
                  />
                  <div>
                    This budget will be applied to the campaign to a specific list that you define on the next step.
                    <br />
                    <small>The more you spend the better results you can achieve. Budgets over $500 include video based ads.</small>
                    <br />
                    <small>You are authorizing this payment to be charged to your card or preferred payment method.</small>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => history.push('/dashboard')} color="info">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                    Save
                  </Button>
                </DialogActions>
              </React.Fragment>
            )}
          </Form>
        </Dialog>
      </React.Fragment>
    )}
  </Query>
)

const styles = () => ({})

const enhance = compose(
  withMobileDialog(),
  withStyles(styles)
)

export default enhance(OrderCreate)
