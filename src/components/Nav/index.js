/** @format */

import React from 'react'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import styles from 'assets/jss/material-dashboard-pro-react/components/navPillsStyle'

const Nav = ({ classes, items: items = [], activeKey, color = 'primary', history, match, location, staticContext, onChange, ...props }) => (
  <Tabs
    classes={{
      root: classes.root,
      fixed: classes.fixed,
      flexContainer: classes.flexContainer,
      indicator: classes.displayNone
    }}
    value={activeKey}
    onChange={(event, key) => {
      const item = items.find(it => it.key === key)
      if (onChange) {
        onChange(item)
      } else if (item) {
        history.push(item.to)
      }
    }}
    {...props}
  >
    {items.map((item, key) =>
      !item.skip ? (
        <Tab
          key={item.key}
          value={item.key}
          label={item.title}
          icon={item.icon ? <item.icon className={classes.tabIcon} /> : null}
          classes={{
            root: classNames({
              [classes.pills]: true,
              [classes.pillsWithIcons]: !!item.icon
            }),
            labelContainer: classes.labelContainer,
            label: classes.label,
            selected: classes[color]
          }}
        />
      ) : null
    )}
  </Tabs>
)

export default withStyles(styles)(withRouter(Nav))
