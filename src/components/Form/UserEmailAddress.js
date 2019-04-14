/** @format */

import React from 'react'
import { Field } from 'redux-form'

import { TextField } from 'lib/fields'

import { required, email } from 'lib/validators'

class UserEmailAddress extends React.Component {
  static defaultProps = {
    name: ''
  }

  render() {
    return (
      <React.Fragment>
        <Field name="email" component={TextField} label="New Email Address" validate={[required(), email()]} />
      </React.Fragment>
    )
  }
}

export default UserEmailAddress
