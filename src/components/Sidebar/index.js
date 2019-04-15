/** @format */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

import { hideSider } from 'api/actions'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
// import AssignmentIcon from '@material-ui/icons/Assignment'

const Sidebar = ({ classes, collapsed, hideSider, match, history }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classNames(classes.sidebarPaper, collapsed && classes.sidebarPaperCollapsed)
    }}
    open={false}
  >
    <div className={classes.sidebarIcon}>
      <IconButton onClick={hideSider}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      <ListItem onClick={() => history.push('/dashboard')} button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem onClick={() => history.push('/clients')} button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clients" />
      </ListItem>
      <ListItem onClick={() => history.push('/orders')} button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem onClick={() => history.push('/products')} button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </List>
  </Drawer>
)

const styles = theme => ({
  sidebarPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: theme.drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  sidebarPaperCollapsed: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    minWidth: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
      minWidth: theme.spacing.unit * 9
    }
  },
  sidebarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
})

export default compose(
  withRouter,
  connect(
    state => ({ collapsed: state.app.siderCollapsed }),
    dispatch => bindActionCreators({ hideSider }, dispatch)
  ),
  withStyles(styles)
)(Sidebar)
