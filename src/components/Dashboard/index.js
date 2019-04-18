/** @format */

import React from 'react'
import { withSnackbar } from 'notistack'

import withStyles from '@material-ui/core/styles/withStyles'

import AppContext from 'AppContext'

const Dashboard = ({ classes, history, match, enqueueSnackbar }) => (
  <React.Fragment>
    <AppContext.Consumer>{({ user }) => <div>Dashboard</div>}</AppContext.Consumer>
  </React.Fragment>
)

const styles = () => ({})

export default withStyles(styles)(withSnackbar(Dashboard))
