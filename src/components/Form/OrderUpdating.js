/** @format */

import React from 'react'
import { Field } from 'components'

import { TextField } from 'lib/fields'

import { withStyles } from '@material-ui/core/styles'

import { required, inclusion, numericality } from 'lib/validators'

class OrderUpdating extends React.Component {
  static defaultProps = {
    name: ''
  }

  render() {
    const { products = [] } = this.props
    return (
      <React.Fragment>
        <Field
          name="productId"
          component={TextField}
          label="Select Product"
          options={Array.from(products).map(it => ({ label: it.name, value: it.id }))}
          validate={[required(), inclusion({ in: Array.from(products).map(it => it.id) })]}
          select
        />
        <Field name="amount" component={TextField} label="Amount" validate={[required(), numericality()]} />
      </React.Fragment>
    )
  }
}

const styles = () => ({})

export default withStyles(styles)(OrderUpdating)
