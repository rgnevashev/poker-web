/** @format */

import React from 'react'
import { compose } from 'recompose'
import { Query, FormDialog, Field } from 'components'
import { TextField, Checkbox } from 'lib/redux-form-material-ui'

import { getPlan, updatePlan } from 'api/plans.graphql'

import withStyles from '@material-ui/core/styles/withStyles'

import { required, numericality } from 'lib/validators'
import { number } from 'lib/normalizers'

const PlanUpdate = ({ classes, fullScreen, tabIndex, setTabIndex, match, onComplete }) => (
  <React.Fragment>
    <Query query={getPlan} variables={match.params}>
      {({ plan }) => (
        <FormDialog
          title={plan.nickname}
          form="PlanUpdate"
          mutation={updatePlan}
          refetchQueries={['getPlans']}
          initialValues={plan}
          success="Plan updated successfully"
        >
          {({ doc, invalid, submitting }) => (
            <React.Fragment>
              <Field name="nickname" component={TextField} label="Name" validate={[required()]} />
              <Field name="trial_period_days" component={TextField} placeholder="Trial period" validate={[numericality()]} normalize={number} />
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
              <Field name="active" component={Checkbox} label="Active" />
            </React.Fragment>
          )}
        </FormDialog>
      )}
    </Query>
  </React.Fragment>
)

const styles = () => ({
  root: {},
  tabs: {
    margin: '5px 0'
  }
})

const enhance = compose(withStyles(styles))

export default enhance(PlanUpdate)
