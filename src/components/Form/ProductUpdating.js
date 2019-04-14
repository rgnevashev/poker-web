/** @format */

import React from 'react'
import { Field } from 'components'

import { TextField, Checkbox } from 'lib/fields'

import { withStyles } from '@material-ui/core/styles'

import { required, length, inclusion, numericality } from 'lib/validators'

class ProductUpdating extends React.Component {
  static defaultProps = {
    name: ''
  }

  render() {
    const { plans = [] } = this.props
    return (
      <React.Fragment>
        <Field name="name" component={TextField} label="Client Name" validate={[required(), length({ min: 2 })]} />
        <Field
          name="plans"
          component={TextField}
          label="Select Plans"
          options={Array.from(plans).map(it => ({ label: it.name, value: it.id }))}
          validate={[required(), inclusion({ in: Array.from(plans).map(it => it.id) })]}
          select
        />
        <Field name="amount" component={TextField} label="Amount" validate={[required(), numericality()]} />
        <Field name="active" component={Checkbox} label="Active" />
      </React.Fragment>
    )
  }
}

const styles = () => ({})

export default withStyles(styles)(ProductUpdating)
