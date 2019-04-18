/** @format */

import React from 'react'
import { compose } from 'recompose'
import { Mutation } from 'components'

import { getClients, removeClient } from 'api/clients.graphql'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import CheckboxTable from 'lib/tables/CheckboxTable'
import UserCell from 'lib/tables/UserCell'

const Clients = ({ classes, history, match }) => (
  <React.Fragment>
    <Mutation mutation={removeClient} refetchQueries={['getClients']}>
      {(remove, { loading: loadingRemove }) => (
        <CheckboxTable
          query={getClients}
          initialVariables={{ sorted: [{ id: 'createdAt', desc: true }] }}
          columns={[
            {
              Header: 'Client',
              accessor: 'q',
              Cell: ({ original: client }) => <UserCell user={client} />
            },
            {
              Header: 'Actions',
              sortable: false,
              filterable: false,
              accessor: 'id',
              Cell: ({ original: client }) => (
                <div>
                  <IconButton onClick={() => history.push(`${match.url}/builder/${client.id}/profile`)} title="Edit Client">
                    <Icon fontSize="small">edit</Icon>
                  </IconButton>
                  <IconButton color="secondary" onClick={() => remove({ variables: { id: client.id } })} title="Remove Client" disabled={loadingRemove}>
                    <Icon fontSize="small">delete</Icon>
                  </IconButton>
                </div>
              )
            }
          ]}
          actions={[
            <Button key="create" variant="contained" color="primary" className={classes.button} onClick={() => history.push(`${match.url}/create`)}>
              <Icon className={classes.leftIcon}>add</Icon>
              Create Client
            </Button>
          ]}
          deleteMany={false}
        />
      )}
    </Mutation>
  </React.Fragment>
)

const styles = theme => ({
  root: {}
})

const enhance = compose(withStyles(styles))

export default enhance(Clients)
