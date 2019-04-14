/** @format */

import React from 'react'
import { Query, FormDialog, FormSection, ClientCreation } from 'components'

import { createUser, getDataForClientCreation } from 'api/users.graphql'
import { getDataFromLocation } from 'api/actions'

import withStyles from '@material-ui/core/styles/withStyles'

import AppContext from 'AppContext'

const ClientCreate = ({ fullScreen, onComplete, location }) => (
  <AppContext.Consumer>
    {({ user }) => (
      <Query query={getDataForClientCreation}>
        {({ agencies }) => (
          <FormDialog
            title="Create Client"
            form="ClientCreate"
            mutation={createUser}
            refetchQueries={['getClients']}
            initialValues={{ ...getDataFromLocation(location), accountType: 'agencyClient' }}
            btnSubmitText="Create"
            success="Client created successfully"
          >
            {({ doc, invalid, submitting }) => (
              <React.Fragment>
                <FormSection name="">
                  <ClientCreation doc={doc} agencies={agencies} user={user} />
                </FormSection>
              </React.Fragment>
            )}
          </FormDialog>
        )}
      </Query>
    )}
  </AppContext.Consumer>
)

const styles = () => ({
  root: {}
})

export default withStyles(styles)(ClientCreate)

// <Field name="profile.notes" component={TextField} label="Client Notes" multiline />
