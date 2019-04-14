/** @format */

import React from 'react'
import { Query, FormDialog, FormSection, OrderCreation } from 'components'
import numeral from 'numeral'

import { getDataForOrderCreation, createOrder } from 'api/orders.graphql'

import withStyles from '@material-ui/core/styles/withStyles'

const OrderCreate = ({ classes, match }) => (
  <Query query={getDataForOrderCreation} variables={match.params}>
    {({ products, usersList }) => (
      <FormDialog
        title="Create One-Time Order"
        subtitle="This means it is a one-time payment order and will not be a subscription. If you want to create subscription or recurring payment order please use the subscription area."
        form="OrderCreate"
        mutation={createOrder}
        refetchQueries={['getOrders']}
        initialValues={{ ...match.params }}
        btnSubmitText="Create"
        success="Order created successfully"
        onSubmit={(create, data) => create({ variables: { ...match.params, data: { ...data, budget: numeral(data.budget).value() } } })}
      >
        {({ doc, invalid, submitting }) => (
          <React.Fragment>
            <FormSection name="">
              <OrderCreation doc={doc} products={products.data} users={usersList} />
            </FormSection>
          </React.Fragment>
        )}
      </FormDialog>
    )}
  </Query>
)

const styles = () => ({
  root: {}
})

export default withStyles(styles)(OrderCreate)
