/** @format */

import React from 'react'
import { Field } from 'redux-form'

import { TextField } from 'lib/fields'
import { required, length } from 'lib/validators'

//import { currencyOptions } from 'variables/options'

class Profile extends React.Component {
  static defaultProps = {
    name: 'profile'
  }

  render() {
    return (
      <React.Fragment>
        <Field name="avatar" component={TextField} label="Avatar" validate={[]} />
        <Field name="name" component={TextField} label="Name" validate={[required(), length({ min: 2 })]} />
        <Field name="phone" component={TextField} label="Phone Number" />
        <Field name="currency" component={TextField} label="Currency" options={[]} />
      </React.Fragment>
    )
  }
}

export default Profile
