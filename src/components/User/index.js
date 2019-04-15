/** @format */

import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  }
})

class Dashboard extends React.Component {
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
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
