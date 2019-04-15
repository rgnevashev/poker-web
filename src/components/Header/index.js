/** @format */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

import { showSider } from 'api/actions'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'

import NotificationsIcon from '@material-ui/icons/Notifications'

const Header = ({ classes, collapsed, showSider }) => (
  <AppBar position="absolute" className={classNames(classes.appBar, !collapsed && classes.appBarShift)}>
    <Toolbar disableGutters={collapsed} className={classes.toolbar}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={showSider}
        className={classNames(classes.menuButton, !collapsed && classes.menuButtonHidden)}
      >
        <MenuIcon />
      </IconButton>
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
        Dashboard
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  </AppBar>
)

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: theme.drawerWidth,
    width: `calc(100% - ${theme.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolbar: {
    paddingRight: 24
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  }
})

export default compose(
  withRouter,
  connect(
    state => ({ collapsed: state.app.siderCollapsed }),
    dispatch => bindActionCreators({ showSider }, dispatch)
  ),
  withStyles(styles)
)(Header)
