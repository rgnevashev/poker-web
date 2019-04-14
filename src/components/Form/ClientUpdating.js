/** @format */

import React from 'react'
import { Field } from 'components'

import { TextField } from 'lib/fields'

import { required, length, email } from 'lib/validators'

class ClientUpdating extends React.Component {
  static defaultProps = {
    name: ''
  }

  render() {
    return (
      <React.Fragment>
        <Field name="name" component={TextField} label="Client Name" validate={[required(), length({ min: 2 })]} />
        <Field name="email" component={TextField} label="Client Email Address" validate={[required(), email()]} />
        <Field name="phone" component={TextField} label="Client Phone" />
      </React.Fragment>
    )
  }
}

export default ClientUpdating
