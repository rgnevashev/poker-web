/** @format */

import React from 'react'
import { Query, FormCard, FormSection, Company } from 'components'

import { getUserCompany, updateUser } from 'api/users.graphql'

import { withStyles } from '@material-ui/core/styles'

const UserCompany = ({ classes, history, match }) => (
  <Query query={getUserCompany} variables={match.params}>
    {({ user }) => (
      <React.Fragment>
        <FormCard
          form="UserCompany"
          mutation={updateUser}
          initialValues={{ company: user.company }}
          title="Edit Company"
          subtitle="Complete company"
          success="Company saved successfully"
          btnSubmitText="Update Company"
        >
          {({ doc, invalid, submitting }) => (
            <FormSection name="company">
              <Company label="Company" company={doc.company} />
            </FormSection>
          )}
        </FormCard>
      </React.Fragment>
    )}
  </Query>
)

const styles = () => ({})

export default withStyles(styles)(UserCompany)
