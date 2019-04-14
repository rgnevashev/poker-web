/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Field } from 'components'
import { TextField } from 'lib/fields'

import { forgotPassword } from 'api/users.graphql'
import { onForgotPwd } from 'api/actions'

import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'

import Email from '@material-ui/icons/Email'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { required, email } from 'lib/validators'

export const ForgotPwd = ({ classes, pristine, invalid, submitting, handleSubmit }) => (
  <Paper className={classes.root}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography align="center" color="textSecondary" variant="subtitle1">
      Don't worry. Just fill in your email and we'll help you reset your password.
    </Typography>
    <Form
      form="ForgotPwd"
      mutation={forgotPassword}
      onSubmit={({ mutation, data }) => mutation({ variables: data })}
      onSubmitSuccess={({ data }, dispatch, { enqueueSnackbar }) => {
        onForgotPwd(data.forgotPassword, enqueueSnackbar)
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
          <Button variant="contained" color="primary" type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send New Password'}
          </Button>
          <Typography className={classes.textAlreadyHaveAcount} align="center" color="default" variant="subtitle1" paragraph>
            Already have an account?
            <Link to="/auth/login"> Login</Link>
          </Typography>
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
  textAlreadyHaveAcount: {
    marginTop: 20
  },
  inputAdornmentIcon: {
    color: '#555'
  }
})

export default withStyles(styles)(ForgotPwd)
