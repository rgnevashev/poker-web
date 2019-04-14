/** @format */

import React from 'react'
import { Field } from 'redux-form'

import { TextField } from 'lib/fields'

import { required, password, confirmation } from 'lib/validators'

class UserPassword extends React.Component {
  static defaultProps = {
    name: ''
  }

  render() {
    return (
      <React.Fragment>
        <Field
          name="currentPassword"
          component={TextField}
          type="password"
          label="Current Password"
          placeholder="Enter your current password"
          validate={[required(), password()]}
        />
        <Field
          name="password"
          component={TextField}
          type="password"
          label="New Password"
          placeholder="Enter a new password"
          validate={[required(), password()]}
        />
        <Field
          name="confirmPassword"
          component={TextField}
          type="password"
          label="Confirm New Password"
          placeholder="Enter the password again"
          validate={[required(), confirmation({ field: 'password', fieldLabel: 'New Password' })]}
        />
      </React.Fragment>
    )
  }
}

export default UserPassword
