/** @format */

import React from 'react'
import { compose } from 'recompose'
import { withMutation } from 'react-apollo'
import withSweetAlert from 'lib/withSweetAlert'
import withUserContext from 'lib/withUserContext'

import { cancelOrder, getOrders } from 'api/orders.graphql'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import CheckboxTable from 'lib/tables/CheckboxTable'

const Orders = ({ classes, user, history, match, alert, remove }) => (
  <CheckboxTable
    query={getOrders}
    variables={match.params}
    initialVariables={{ sorted: [{ id: 'createdAt', desc: true }] }}
    columns={[
      {
        Header: 'Number',
        accessor: 'number'
      },
      {
        Header: 'Product',
        id: 'q',
        accessor: order => order.product && order.product.name
      },
      {
        Header: 'Campaign',
        accessor: 'campaignType'
      },
      {
        Header: 'List',
        accessor: 'listName'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Payment Status',
        accessor: 'paymentStatus'
      },
      {
        Header: 'Budget',
        accessor: 'budget'
      },
      {
        Header: 'Actions',
        sortable: false,
        filterable: false,
        accessor: 'id',
        Cell: ({ original: order }) => {
          const actions = [
            {
              color: 'default',
              icon: 'assignment',
              onClick: () => history.push(`${match.url}/${order.id}/wizard`),
              title: 'Order Wizard',
              show: ['agencyClient'].includes(user.accountType)
            },
            {
              color: 'default',
              icon: 'build',
              onClick: () => history.push(`${match.url}/builder/${order.id}/update`),
              title: 'Order Builder',
              show: ['agency', 'admin'].includes(user.accountType)
            },
            {
              color: 'default',
              icon: 'show_chart',
              onClick: () => history.push(`/orders/${order.id}/stats`),
              title: 'Order Stats',
              show: order.status !== 'draft' && order.status !== 'cancelled'
            },
            {
              color: 'default',
              icon: 'code',
              onClick: () => history.push(`/orders/${order.id}/tag`),
              title: 'Order Tag',
              show: order.status !== 'cancelled'
            },
            {
              color: 'secondary',
              icon: 'delete',
              onClick: () => {
                alert.confirm('Are you sure?', 'You will not be able to recover this order!', () => remove({ variables: { orderId: order.id } }))
              },
              title: 'Order Cancel',
              show: ['agency', 'admin'].includes(user.accountType) && order.status !== 'cancelled'
            }
          ]
          return (
            <div>
              {actions.map((action, key) => {
                return (
                  action.show && (
                    <IconButton color={action.color} className={classes.actionButton} key={key} onClick={action.onClick} title={action.title}>
                      <Icon className={classes.icon}>{action.icon}</Icon>
                    </IconButton>
                  )
                )
              })}
            </div>
          )
        }
      }
    ]}
    actions={[
      ['agency', 'admin'].includes(user.accountType) && (
        <Button key="create" variant="contained" color="primary" onClick={() => history.push(`${match.url}/create`)}>
          <Icon>add</Icon>
          Create Order
        </Button>
      )
    ]}
    deleteMany={['agency', 'admin'].includes(user.accountType)}
  />
)

const styles = theme => ({
  root: {}
})

const enhance = compose(
  withMutation(cancelOrder, { name: 'remove', options: { refetchQueries: [{ query: getOrders }] } }),
  withSweetAlert,
  withUserContext,
  withStyles(styles)
)

export default enhance(Orders)
