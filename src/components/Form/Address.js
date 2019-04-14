/** @format */

import React from 'react'
import { Field } from 'redux-form'

import { TextField } from 'lib/fields'
// import { required } from 'lib/validators'

import Grid from '@material-ui/core/Grid'

//import { countriesOptions, statesOptions } from 'variables/options'

class Address extends React.Component {
  static defaultProps = {
    name: 'address'
  }

  render() {
    const { address = {} } = this.props

    return (
      <React.Fragment>
        <Field name="location" component={TextField} label="Location" />
        <Field name="addressLine1" component={TextField} label="Address Line 1" multiline />
        <Field name="addressLine2" component={TextField} label="Address Line 2" multiline />
        <Grid spacing={8} justify="center" container>
          <Grid xs={4} item>
            <Field name="city" component={TextField} label="City" />
          </Grid>
          <Grid xs={4} item>
            {address && address.country === 'US' ? (
              <Field name="state" component={TextField} label="State" options={[]} />
            ) : (
              <Field name="county" component={TextField} label="County" />
            )}
          </Grid>
          <Grid xs={4} item>
            <Field name="zip" component={TextField} label="Postal Code" />
          </Grid>
        </Grid>
        <Field name="country" component={TextField} label="Country" options={[]} />
      </React.Fragment>
    )
  }
}

export default Address
