/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom' // Switch

import withStyles from '@material-ui/core/styles/withStyles'
import Icon from '@material-ui/core/Icon'
import GridItem from 'components/Grid/GridItem'
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardIcon from 'components/Card/CardIcon'
import CardFooter from 'components/Card/CardFooter'

import DateRange from '@material-ui/icons/DateRange'

import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'

import AppContext from 'AppContext'

import Orders from './Orders'
import OrderCreate from './OrderCreate'

import { withSnackbar } from 'notistack'
import OrderTag from './OrderTag.js'

const Dashboard = ({ classes, history, match, enqueueSnackbar }) => (
  <React.Fragment>
    <AppContext.Consumer>
      {({ user }) => (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Icon>shopping_cart</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Orders</p>
                  <h3 className={classes.cardTitle}>{user.stats.orders || 0}</h3>
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
              <Card onClick={() => history.push(`/leads`)} className="cursor-pointer">
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon>assignment_ind</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Leads</p>
                  <h3 className={classes.cardTitle}>{user.stats.leads || 0}</h3>
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
              <Card onClick={() => history.push(`/conversational-pages`)} className="cursor-pointer">
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Icon>web</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Landing Pages</p>
                  <h3 className={classes.cardTitle}>{user.stats.clps || 0}</h3>
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
              <Card className="cursor-pointer" onClick={() => history.push(`/visitors`)}>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon>people</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Visitors</p>
                  <h3 className={classes.cardTitle}>{user.stats.visitors || 0}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    All Time
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Orders />
            </GridItem>
          </GridContainer>

          {user.DSPTag && <OrderTag forUser={user.id} />}
        </div>
      )}
    </AppContext.Consumer>
    <Route path={`${match.path}/order-create`} component={OrderCreate} />
  </React.Fragment>
)

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(withSnackbar(Dashboard))
