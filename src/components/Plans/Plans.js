/** @format */

import React from 'react'
import { compose } from 'recompose'
import { Mutation } from 'components'
import { withSnackbar } from 'notistack'
import withSweetAlert from 'lib/withSweetAlert'
import numeral from 'numeral'
import moment from 'moment'

import { getPlans, removePlan } from 'api/plans.graphql'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import CheckboxTable from 'lib/tables/CheckboxTable'

const Plans = ({ classes, history, match, enqueueSnackbar, alert }) => (
  <React.Fragment>
    <Mutation mutation={removePlan} refetchQueries={['getPlans']}>
      {(remove, { loading: loadingRemove }) => (
        <CheckboxTable
          query={getPlans}
          variables={{ product: match.params.productId }}
          initialVariables={{ sorted: [{ id: 'createdAt', desc: true }] }}
          columns={[
            {
              Header: 'Name',
              accessor: 'nickname'
            },
            {
              Header: 'Billing',
              accessor: 'amount',
              Cell: ({ original: plan }) => <div>{`${numeral(plan.amount / 100).format('$0.00')} per ${plan.interval_count} ${plan.interval}`}</div>
            },
            {
              Header: 'Date Created',
              id: 'createdAt',
              accessor: plan => moment(plan.createdAt).format('LLL')
            },
            {
              Header: 'Actions',
              sortable: false,
              filterable: false,
              accessor: 'id',
              Cell: ({ original: plan }) => {
                return (
                  <div>
                    <IconButton onClick={() => history.push(`${match.url}/${plan.id}/update`)} title="Edit Plan">
                      <Icon fontSize="small">edit</Icon>
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => alert.confirm('', 'Are you sure you want to delete this Plan?', () => remove({ variables: { id: plan.id } }))}
                      title="Remove Plan"
                      disabled={loadingRemove}
                    >
                      <Icon fontSize="small">delete</Icon>
                    </IconButton>
                  </div>
                )
              }
            }
          ]}
          actions={[
            <Button key="create" variant="contained" color="primary" className={classes.button} onClick={() => history.push(`${match.url}/create`)}>
              <Icon className={classes.leftIcon}>add</Icon>
              Create Plan
            </Button>
          ]}
          deleteMany={false}
        />
      )}
    </Mutation>
  </React.Fragment>
)

const styles = theme => ({
  root: {},
  button: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

const enhance = compose(
  withSnackbar,
  withSweetAlert,
  withStyles(styles)
)

export default enhance(Plans)
