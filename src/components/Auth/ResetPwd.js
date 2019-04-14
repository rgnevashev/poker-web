/** @format */

import React from 'react'
import { Form, Field } from 'components'
import { TextField } from 'lib/fields'

import { resetPassword } from 'api/users.graphql'
import { onResetPwd } from 'api/actions'

import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { required, password, confirmation } from 'lib/validators'

const ResetPwd = ({ classes, match }) => (
  <Paper className={classes.root}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography align="center" color="textSecondary" variant="subtitle1">
      Enter your new password
    </Typography>
    <Form
      form="ResetPwd"
      mutation={resetPassword}
      onSubmit={({ mutation, data }) => mutation({ variables: { ...data, ...match.params } })}
      onSubmitSuccess={({ data }, dispatch, { enqueueSnackbar }) => {
        onResetPwd(data.resetPassword, enqueueSnackbar)
      }}
    >
      {({ doc, invalid, submitting }) => (
        <React.Fragment>
          <Field
            name="password"
            type="password"
            component={TextField}
            label="Password"
            validate={[required(), password()]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                </InputAdornment>
              )
            }}
          />
          <Field
            name="confirmPassword"
            type="password"
            component={TextField}
            label="Confirm Password"
            validate={[required(), confirmation({ field: 'password' })]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                </InputAdornment>
              )
            }}
          />
          <Button variant="contained" color="primary" type="submit" disabled={submitting}>
            {submitting ? 'Submitting' : 'Set New Password'}
          </Button>
        </React.Fragment>
      )}
    </Form>
  </Paper>
)

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  inputAdornmentIcon: {
    color: '#555'
  }
})

export default withStyles(styles)(ResetPwd)
