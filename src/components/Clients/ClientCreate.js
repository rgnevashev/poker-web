/** @format */

import React from 'react'
import { Query, FormDialog, Field } from 'components'
import { TextField } from 'lib/fields'

import { createClient, getDataForClientCreation } from 'api/clients.graphql'

import withStyles from '@material-ui/core/styles/withStyles'

import { required, length } from 'lib/validators'

const ClientCreate = ({ classes, match }) => (
  <Query query={getDataForClientCreation} variables={match.params}>
    {({ agencies }) => (
      <FormDialog
        title="Create Client"
        form="ClientCreate"
        mutation={createClient}
        refetchQueries={['getClients']}
        initialValues={{}}
        btnSubmitText="Create"
        success="Client created successfully"
      >
        {({ doc, invalid, submitting }) => (
          <React.Fragment>
            <Field name="name" component={TextField} label="Client Name" validate={[required(), length({ min: 2 })]} />
          </React.Fragment>
        )}
      </FormDialog>
    )}
  </Query>
)

const styles = () => ({
  root: {}
})

export default withStyles(styles)(ClientCreate)
