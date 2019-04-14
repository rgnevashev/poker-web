/** @format */

import React from 'react'
import { compose } from 'recompose'
import { Mutation } from 'components'
//import Avatar from 'react-avatar'
import Avatar from 'lib/Avatar'
import withSweetAlert from 'lib/withSweetAlert'

import { getClients, forgotPassword, removeClient, removeClients } from 'api/users.graphql'
import withLoginAs from 'lib/withLoginAs'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/Phone'

import CheckboxTable from 'lib/tables/CheckboxTable'

const Clients = ({ classes, history, match, logginAs, loginAs, alert }) => (
  <React.Fragment>
    <Mutation mutation={removeClient} refetchQueries={['getClients']}>
      {(remove, { loading: loadingRemove }) => (
        <Mutation mutation={removeClients} refetchQueries={['getClients']}>
          {(removeMany, { loading: loadingRemove }) => (
            <Mutation mutation={forgotPassword} refetchQueries={['getClients']}>
              {(forgotPassword, { loading: loadingForgotPassword }) => (
                <CheckboxTable
                  query={getClients}
                  initialVariables={{ sorted: [{ id: 'createdAt', desc: true }] }}
                  columns={[
                    {
                      Header: 'Client',
                      accessor: 'q',
                      Cell: ({ original: client }) => (
                        <div className="d-flex flex-row">
                          <Avatar {...client} size={40} round />
                          <address className="d-flex flex-column m-l-5">
                            <strong>{client.name}</strong>
                            {client.email && (
                              <span className="d-flex align-items-center">
                                <MailOutlineIcon style={{ width: 20, height: 20 }} />{' '}
                                <a className="m-l-5" href={`mailto:${client.email}`}>
                                  {client.email}
                                </a>
                              </span>
                            )}
                            {client.phone && (
                              <span className="d-flex align-items-center">
                                <PhoneIcon style={{ width: 20, height: 20 }} /> <span className="m-l-5">{client.phone}</span>
                              </span>
                            )}
                          </address>
                        </div>
                      )
                    },
                    {
                      Header: 'Payment Method',
                      accessor: 'defaultSource.last4',
                      sortable: false,
                      filterable: false,
                      Cell: ({ original: { defaultSource: source } }) =>
                        source && source.last4 ? (
                          <div>
                            <span>{source.brand}</span>
                            <br />
                            <span>{`•••• ${source.last4} ${source.exp_month}/${source.exp_year}`}</span>
                          </div>
                        ) : null
                    },
                    {
                      Header: 'Agency',
                      accessor: 'agency.name'
                    },
                    {
                      Header: 'Company Name',
                      accessor: 'company.name'
                    },
                    {
                      Header: 'Actions',
                      sortable: false,
                      filterable: false,
                      accessor: 'id',
                      Cell: ({ original: client }) => (
                        <div>
                          <IconButton onClick={() => loginAs(client.id)} title="Login as User" disabled={logginAs}>
                            <Icon fontSize="small">exit_to_app</Icon>
                          </IconButton>
                          <IconButton
                            onClick={() => forgotPassword({ variables: { email: client.email } })}
                            title="Reset Password"
                            disabled={loadingForgotPassword}
                          >
                            <Icon fontSize="small">https</Icon>
                          </IconButton>
                          <IconButton onClick={() => history.push(`${match.url}/${client.id}/profile`)} title="Edit Client">
                            <Icon fontSize="small">edit</Icon>
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => alert.confirm('', 'Are you sure you want to delete this Client?', () => remove({ variables: { id: client.id } }))}
                            title="Remove Client"
                            disabled={loadingRemove}
                          >
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
                  onDeleteAll={selection => removeMany({ variables: { ids: selection } })}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </Mutation>
  </React.Fragment>
)

const styles = theme => ({
  root: {},
  button: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

const enhance = compose(
  withLoginAs,
  withSweetAlert,
  withStyles(styles)
)

export default enhance(Clients)
