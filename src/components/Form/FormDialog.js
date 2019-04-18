/** @format */

import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import Form from 'components/Form/Form'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'

const FormDialog = ({
  title,
  subtitle,
  children,
  fullScreen,
  onComplete,
  success,
  buttons,
  btnSubmitText = 'Save',
  redirect = true,
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
      <Dialog fullScreen={fullScreen} open fullWidth maxWidth="md">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {subtitle && (
            <div>
              <small>{subtitle}</small>
            </div>
          )}
          <div>{children(props)}</div>
        </DialogContent>
        <DialogActions>
          <Button color="default" onClick={() => (onComplete ? onComplete() : history.goBack())} disabled={props.submitting}>
            Cancel
          </Button>
          {buttons
            ? buttons(props)
            : [
                <Button color="primary" variant="contained" onClick={props.submit} key="submit" disabled={props.submitting}>
                  {props.submitting ? 'Submitting...' : btnSubmitText}
                </Button>
              ]}
        </DialogActions>
      </Dialog>
    )}
  </Form>
)

const styles = () => ({})

export default compose(
  withRouter,
  withMobileDialog(),
  withStyles(styles)
)(FormDialog)
