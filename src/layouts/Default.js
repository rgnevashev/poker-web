/** @format */

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

import Dashboard from 'components/Dashboard'
import Clients from 'components/Clients'
import Products from 'components/Products'

class DefaultLayout extends React.Component {
  state = {
    open: true
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Header />
        <Sidebar />
        <main className={classes.content}>
          <Switch>
            <Redirect exact path="/" to="/dashboard" />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/clients" component={Clients} />
            <Route path="/products" component={Products} />
            {/*<Route path="/products" component={Products} />*/}
          </Switch>
        </main>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    paddingTop: 70,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  appBarSpacer: theme.mixins.toolbar
})

export default withStyles(styles)(DefaultLayout)

/*
import Typography from '@material-ui/core/Typography'
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Orders
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            SimpleLineChart
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Products
          </Typography>
          <div className={classes.tableContainer}>SimpleTable</div>
          <Typography variant="h4" gutterBottom component="h2">
            Dashboard
          </Typography>          
          */
