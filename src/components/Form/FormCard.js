/** @format */

import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import Form from 'components/Form/Form'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { Button } from '@material-ui/core'

const FormCard = ({
  classes,
  title,
  subheader,
  children,
  onComplete,
  success,
  actions = [],
  buttons,
  btnSubmitText = 'Save',
  redirect = false,
  history,
  ...formProps
}) => (
  <Form
    onSubmitSuccess={(result, dispatch, { enqueueSnackbar }) => {
      if (success) {
        enqueueSnackbar(success, { variant: 'success' })
      }
      onComplete ? onComplete() : redirect && history.goBack()
    }}
    {...formProps}
  >
    {props => (
      <Card>
        <CardHeader action={actions && actions.length ? actions : null} title={title} subheader={subheader} />
        <CardContent>{children(props)}</CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {buttons
            ? buttons(props)
            : [
                <Button color="primary" onClick={props.submit} key="submit" disabled={props.submitting}>
                  {props.submitting ? 'Submitting...' : btnSubmitText}
                </Button>
              ]}
        </CardActions>
      </Card>
    )}
  </Form>
)

const styles = () => ({
  actions: {
    display: 'flex'
  }
})

export default compose(
  withRouter,
  withStyles(styles)
)(FormCard)
