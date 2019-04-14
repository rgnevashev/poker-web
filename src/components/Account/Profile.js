/** @format */

import React from 'react'
import { compose } from 'recompose'
import { Route, Link } from 'react-router-dom'
import { Query, FormDialog, FormCard, Field, FormSection, Profile, UserPassword, UserEmailAddress } from 'components'
import { TextField, Checkbox } from 'lib/redux-form-material-ui'
import { required } from 'lib/validators'
import withUserContext from 'lib/withUserContext'

import { getUserProfile, updateUser, changePassword, changeEmailAddress } from 'api/users.graphql'

import { withStyles } from '@material-ui/core/styles'

const UserProfile = ({ classes, user: currentUser, history, match }) => (
  <Query query={getUserProfile} variables={match.params}>
    {({ user, agencyRoles }) => (
      <React.Fragment>
        <FormCard
          form="UserProfile"
          mutation={updateUser}
          initialValues={{ profile: user.profile, role: user.role, hidden: user.hidden }}
          title="Edit Profile"
          subtitle="Complete profile"
          success="Profile saved successfully"
          btnSubmitText="Update Profile"
        >
          {({ doc, invalid, submitting }) => (
            <React.Fragment>
              <div>
                Email Address is <strong>{user.email}</strong> <Link to={`${match.url}/set-email-address`}>Change</Link>
              </div>
              <FormSection name="profile">
                <Profile label="Profile" />
              </FormSection>
              {user.accountType === 'agency' && currentUser.accountType === 'admin' && (
                <React.Fragment>
                  <Field
                    name="role"
                    component={TextField}
                    label="Agency Role"
                    options={agencyRoles.map(it => ({ label: it.name, value: it.role }))}
                    validate={[required()]}
                    select
                  />
                </React.Fragment>
              )}
              {user.accountType === 'agencyClient' && ['agency', 'admin'].includes(currentUser.accountType) && (
                <React.Fragment>
                  <Field name="hidden" component={Checkbox} label="Make Hidden Client" />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </FormCard>
        <FormCard
          form="UserPasswordUpdate"
          mutation={changePassword}
          title="Password"
          subtitle="Changing password"
          success="You have successfully updated password"
          btnSubmitText="Update Password"
        >
          {({ doc, invalid, submitting }) => (
            <FormSection name="">
              <UserPassword />
            </FormSection>
          )}
        </FormCard>
        <Route
          path={`${match.path}/set-email-address`}
          render={props => (
            <FormDialog
              title="Set Email Address"
              form="EmailAddressSet"
              mutation={changeEmailAddress}
              refetchQueries={['getUserProfile']}
              btnSubmitText="Change Email Address"
              success="Email Address changed successfully"
              onSubmit={(update, { email }) => update({ variables: { ...match.params, email } })}
            >
              {({ doc, invalid, submitting }) => (
                <FormSection name="">
                  <UserEmailAddress />
                </FormSection>
              )}
            </FormDialog>
          )}
        />
      </React.Fragment>
    )}
  </Query>
)

const styles = () => ({})

export default compose(
  withUserContext,
  withStyles(styles)
)(UserProfile)
