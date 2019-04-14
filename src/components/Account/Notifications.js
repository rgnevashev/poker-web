/** @format */

import React from 'react'
import { Query, FormCard, FormSection, UserUserNotifications } from 'components'

import { getUserSettings, updateUser } from 'api/users.graphql'

import withStyles from '@material-ui/core/styles/withStyles'

const UserNotifications = ({ classes, match }) => (
  <React.Fragment>
    <Query query={getUserSettings} variables={match.params}>
      {({ user }) => (
        <React.Fragment>
          <FormCard
            form="UserNotifications"
            mutation={updateUser}
            initialValues={{ settings: user.settings }}
            title="Notifications"
            subtitle="Complete notifications"
            success="Notifications saved successfully"
          >
            {({ doc, invalid, submitting }) => (
              <FormSection name="">
                <UserUserNotifications doc={doc} />
              </FormSection>
            )}
          </FormCard>
        </React.Fragment>
      )}
    </Query>
  </React.Fragment>
)

const styles = theme => ({
  root: {}
})

export default withStyles(styles)(UserNotifications)
