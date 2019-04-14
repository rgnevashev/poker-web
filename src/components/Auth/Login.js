/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Field } from 'components'
import { TextField } from 'lib/fields'

import { login } from 'api/users.graphql'
import { onLogin } from 'api/actions'

import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'

import Email from '@material-ui/icons/Email'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { required, email } from 'lib/validators'

const LoginForm = ({ classes }) => (
  <Paper className={classes.root}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <Form
      form="LoginForm"
      mutation={login}
      onSubmit={({ mutation, data }) => mutation({ variables: data })}
      onSubmitSuccess={({ data }, dispatch, { enqueueSnackbar }) => {
        onLogin(data.login, enqueueSnackbar)
      }}
    >
      {({ doc, invalid, submitting, reset }) => (
        <React.Fragment>
          <Field
            name="email"
            component={TextField}
            label="Email"
            validate={[required(), email()]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Email className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
          <Field
            name="password"
            type="password"
            component={TextField}
            label="Password"
            validate={[required()]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                </InputAdornment>
              )
            }}
          />
          <p>
            <Link to="/auth/forgot-password">Forgot password?</Link>
          </p>
          <Button fullWidth variant="contained" color="primary" type="submit" disabled={submitting}>
            Let's Go
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

export default withStyles(styles)(LoginForm)
