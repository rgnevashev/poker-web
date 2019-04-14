/** @format */

import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import { getOrders } from 'api/orders.graphql'

import withStyles from '@material-ui/core/styles/withStyles'
import Icon from '@material-ui/core/Icon'
import Button from 'components/CustomButtons/Button'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardBody from 'components/Card/CardBody'

import CheckboxTable from 'lib/tables/Table'

import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'

import AppContext from 'AppContext'

const Orders = ({ classes, history, match }) => (
  <React.Fragment>
    <AppContext.Consumer>
      {({ user }) => (
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>
              Orders
              <Button style={{ float: 'right' }} color="success" onClick={() => history.push(`${match.url}/order-create`)}>
                <Icon className={classes.icon}>add</Icon> Create New Order
              </Button>
            </h4>
          </CardHeader>
          <CardBody>
            <CheckboxTable
              query={getOrders}
              variables={{ userId: user.id }}
              initialVariables={{ sorted: [{ id: 'createdAt', desc: true }] }}
              columns={[
                {
                  Header: 'Product',
                  accessor: 'q',
                  Cell: ({ original: order }) => (
                    <div>
                      {order.product ? order.product.name : order.productName}{' '}
                      <small>
                        <i>{new Date(order.createdAt).toDateString()}</i>
                      </small>
                    </div>
                  )
                },
                {
                  Header: 'Status',
                  accessor: 'status'
                },
                {
                  Header: 'Budget',
                  accessor: 'budget',
                  Cell: ({ original: order }) => <div>${order.budget}</div>
                },
                {
                  Header: 'Actions',
                  sortable: false,
                  filterable: false,
                  accessor: 'id',
                  Cell: ({ original: order }) => {
                    const actions = [
                      {
                        color: 'success',
                        icon: 'build',
                        onClick: () => history.push(`/orders/${order.id}/wizard`),
                        show: order.status === 'draft'
                      },
                      {
                        color: 'info',
                        icon: 'show_chart',
                        onClick: () => history.push(`/orders/${order.id}/stats`),
                        show: order.status !== 'draft' && order.status !== 'cancelled'
                      },
                      {
                        color: 'info',
                        icon: 'code',
                        onClick: () => history.push(`/orders/${order.id}/tag`),
                        show: order.status !== 'cancelled'
                      },
                      {
                        color: 'danger',
                        icon: 'delete',
                        onClick: () => {},
                        show: order.status !== 'cancelled'
                      }
                    ]
                    return (
                      <div>
                        {actions.map((action, key) => {
                          return (
                            action.show && (
                              <Button color={action.color} className={classes.actionButton} key={key} onClick={action.onClick}>
                                <Icon className={classes.icon}>{action.icon}</Icon>
                              </Button>
                            )
                          )
                        })}
                      </div>
                    )
                  }
                }
              ]}
            />
          </CardBody>
        </Card>
      )}
    </AppContext.Consumer>
  </React.Fragment>
)

/*
const styles = () => ({
  actionButton: {}
})
*/

const enhance = compose(
  withRouter,
  withStyles(dashboardStyle)
)

export default enhance(Orders)
