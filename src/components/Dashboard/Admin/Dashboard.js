/** @format */

import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles'
import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import Store from '@material-ui/icons/Store'
import DateRange from '@material-ui/icons/DateRange'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import Table from 'components/Table/Table.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardIcon from 'components/Card/CardIcon.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx'

import { Query } from 'components'

import { getAdminStats } from 'api/users.graphql'
import numeral from 'numeral'

class AdminDashboard extends React.Component {
  state = {
    value: 0
  }
  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }
  render() {
    const { classes, history } = this.props
    return (
      <Query query={getAdminStats}>
        {({ adminStats, loading }) => {
          if (!adminStats) return null
          if (loading) return null
          return (
            <div>
              <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                  <Card onClick={() => history.push(`/agencies`)} className="cursor-pointer">
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <Icon>people</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Agencies</p>
                      <h3 className={classes.cardTitle}>{adminStats.countAgencies}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <DateRange />
                        All Time
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card onClick={() => history.push(`/clients`)} className="cursor-pointer">
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <Icon>person</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Clients</p>
                      <h3 className={classes.cardTitle}>{adminStats.countClients}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <DateRange />
                        All Time
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success">
                        <Icon>shopping_cart</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Orders</p>
                      <h3 className={classes.cardTitle}>{adminStats.countOrders}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <DateRange />
                        Last 30 days
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success">
                        <Store />
                      </CardIcon>
                      <p className={classes.cardCategory}>Revenue</p>
                      <h3 className={classes.cardTitle}>{numeral(adminStats.revenue).format('$0.00')}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <DateRange />
                        Last 30 days
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>Orders</h4>
                      <p className={classes.cardCategoryWhite}>Last 5 orders</p>
                    </CardHeader>
                    <CardBody>
                      <Table
                        tableHeaderColor="warning"
                        tableHead={['Date', 'Product', 'Client', 'Agency', 'Budget']}
                        tableData={adminStats.orders.map(order => {
                          return [
                            new Date(order.createdAt).toLocaleString(),
                            order.product ? order.product.name : order.productName,
                            order.user ? order.user.name : '',
                            order.user && order.user.agency ? order.user.agency.name : '',
                            order.budget
                          ]
                        })}
                      />
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          )
        }}
      </Query>
    )
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(AdminDashboard)
