/** @format */

import React from 'react'
import { compose } from 'recompose'
import { FormDialog, Field } from 'components'
import { TextField, Checkbox } from 'lib/redux-form-material-ui'

import { createPlan } from 'api/plans.graphql'

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { required, numericality } from 'lib/validators'
import { number } from 'lib/normalizers'

import { intervalOptions } from 'variables/options'

const PlanCreate = ({ fullScreen, match, onComplete }) => (
  <React.Fragment>
    <FormDialog
      title="Create Plan"
      form="PlanCreate"
      mutation={createPlan}
      refetchQueries={['getPlans']}
      initialValues={{ product: match.params.productId, interval_count: 1, interval: 'month' }}
      btnSubmitText="Create"
      success="Plan created successfully"
    >
      {({ doc, invalid, submitting }) => (
        <React.Fragment>
          <Field name="nickname" component={TextField} label="Name" validate={[required()]} />
          <Typography variant="subtitle2" color="inherit">
            Billing interval
          </Typography>
          <Grid container spacing={8}>
            <Grid item>
              <Field name="amount" component={TextField} placeholder="Amount" validate={[required(), numericality()]} />
            </Grid>
            <Grid item>
              <Field name="interval_count" component={TextField} validate={[required(), numericality()]} normalize={number} />
            </Grid>
            <Grid item>
              <Field name="interval" component={TextField} options={intervalOptions} select />
            </Grid>
          </Grid>
          <Field
            name="billTimes"
            component={TextField}
            label="Billing Times"
            helperText={`Rebill ${doc.billTimes ||
              'infinite'} Times then Cancel Subscription. This means the subscription will stop after it has successfully billed this number of times.`}
            placeholder="Leave blank if infinite billing"
            validate={[numericality({ '>': 1 })]}
            normalize={number}
          />
          <Field name="trial_period_days" component={TextField} placeholder="Trial period" validate={[numericality()]} normalize={number} />
          {/*<Field name="active" component={Checkbox} label="Active" />*/}
        </React.Fragment>
      )}
    </FormDialog>
  </React.Fragment>
)

const styles = () => ({
  root: {}
})

const enhance = compose(withStyles(styles))

export default enhance(PlanCreate)
