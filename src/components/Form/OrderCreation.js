/** @format */

import React from 'react'
import { Field } from 'components'

import { TextField } from 'lib/fields'

import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

import { required, inclusion, numericality } from 'lib/validators'

class OrderCreation extends React.Component {
  static defaultProps = {
    name: ''
  }

  render() {
    const { classes, products = [], clients = [] } = this.props
    return (
      <React.Fragment>
        <Field
          name="userId"
          component={TextField}
          label="Select User"
          options={Array.from(clients).map(it => ({
            label: (
              <div className={classes.listItem}>
                <Avatar alt={it.name} src={it.avatar} />
                <span style={{ margin: '0 7px' }}>{it.name}</span>
              </div>
            ),
            value: it.id
          }))}
          validate={[required(), inclusion({ in: Array.from(clients).map(it => it.id) })]}
          select
        />
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

const styles = () => ({
  listItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  }
})

export default withStyles(styles)(OrderCreation)
