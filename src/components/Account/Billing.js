/** @format */

import React from 'react'
import { compose, withState } from 'recompose'
import { Route, Switch } from 'react-router-dom'
import { Query, Mutation, FormDialog, FormSection, CardUpdating } from 'components'
import Table from 'react-table'
import numeral from 'numeral'
import _ from 'lodash'
import { injectStripe, CardElement } from 'react-stripe-elements'
import { withSnackbar } from 'notistack'

import { getUserBilling, addPaymentMethod, updateCard, removePaymentMethod } from 'api/users.graphql'
import { createCCToken } from 'api/actions'

import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from 'components/CustomButtons/Button'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardBody from 'components/Card/CardBody'

const Billing = ({ classes, history, match, expanded, setExpanded, stripe, enqueueSnackbar }) => (
  <React.Fragment>
    <Mutation
      mutation={removePaymentMethod}
      refetchQueries={['getUserBilling']}
      onCompleted={() => enqueueSnackbar('The Payment Method deleted successfully', { variant: 'success' })}
    >
      {(removePayment, { loading: removePaymentLoading }) => (
        <Query query={getUserBilling} variables={match.params}>
          {({ sources, charges }) => (
            <React.Fragment>
              <Card>
                <CardHeader>
                  <Button style={{ float: 'right' }} color="success" onClick={() => history.push(`${match.url}/payments/add`)}>
                    <Icon className={classes.icon}>add</Icon> Add Credit Card
                  </Button>
                  <Typography variant="h5" color="inherit">
                    Billing
                  </Typography>
                  <Typography variant="body2" color="inherit">
                    <em>Complete billing information</em>
                  </Typography>
                </CardHeader>
                <CardBody>
                  <div>
                    {Array.from((sources && sources.data) || []).map(source => (
                      <ExpansionPanel expanded={expanded === source.id} onChange={() => setExpanded(source.id)} key={source.id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>
                            <span className="m-x-10">{source.brand}</span>
                            <span className="m-x-10">{`•••• ${source.last4} ${source.exp_month}/${source.exp_year}`}</span>
                          </Typography>
                          <Typography className={classes.secondaryHeading}>
                            <IconButton color="primary" onClick={() => history.push(`${match.url}/payments/${source.id}/update`)}>
                              <Icon>edit</Icon>
                            </IconButton>
                            <IconButton color="secondary" onClick={() => removePayment({ variables: { id: source.id } })} disabled={removePaymentLoading}>
                              <Icon>delete_forever</Icon>
                            </IconButton>
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <table width="100%">
                            <tbody>
                              <tr>
                                <td width="100">Name</td>
                                <td>{source.name}</td>
                              </tr>
                              <tr>
                                <td width="100">Number</td>
                                <td>{`•••• ${source.last4}`}</td>
                              </tr>
                              <tr>
                                <td width="100">Expires</td>
                                <td>{`${source.exp_month}/${source.exp_year}`}</td>
                              </tr>
                              <tr>
                                <td width="100">Type</td>
                                <td>{`${source.brand} ${source.funding}`}</td>
                              </tr>
                              <tr>
                                <td width="100">Postal code</td>
                                <td>{source.address_zip}</td>
                              </tr>
                              <tr>
                                <td width="100">Origin</td>
                                <td>{source.country}</td>
                              </tr>
                              <tr>
                                <td width="100">CVC check</td>
                                <td>{source.cvc_check}</td>
                              </tr>
                              <tr>
                                <td width="100">Zip check</td>
                                <td>{source.address_zip_check}</td>
                              </tr>
                              <tr>
                                <td width="100">Fingerprint</td>
                                <td>{source.fingerprint}</td>
                              </tr>
                            </tbody>
                          </table>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    ))}
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Typography variant="h5" color="inherit">
                    Payments
                  </Typography>
                  <Typography variant="body2" color="inherit">
                    <em>Payments history</em>
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Table
                    data={(charges && charges.data) || []}
                    columns={[
                      { Header: 'Date', accessor: 'created' },
                      { Header: 'Description', accessor: 'description' },
                      { Header: 'Amount', id: 'amount', accessor: charge => numeral(charge.amount / 100).format('$0.00') },
                      { Header: 'Status', accessor: 'status' }
                    ]}
                  />
                </CardBody>
              </Card>
              <Switch>
                <Route
                  path={`${match.path}/payments/add`}
                  render={props => (
                    <FormDialog
                      title="Add Payment Method"
                      form="PaymentAdd"
                      mutation={addPaymentMethod}
                      refetchQueries={['getUserBilling']}
                      onSubmit={(mutation, data) =>
                        createCCToken(stripe, data).then(source => mutation({ variables: { ...match.params, data: { ...data, source } } }))
                      }
                      btnSubmitText="Add Payment Method"
                      success="The Payment Method added successfully"
                    >
                      {({ doc, invalid, submitting }) => <CardElement style={{ base: { fontSize: '16px' } }} />}
                    </FormDialog>
                  )}
                />
                <Route
                  path={`${match.path}/payments/:cardId/update`}
                  render={props => (
                    <div>
                      <FormDialog
                        title="Update Payment Method"
                        form="PaymentUpdate"
                        mutation={updateCard}
                        refetchQueries={['getUserBilling']}
                        initialValues={_.pick(
                          Array.from((sources && sources.data) || []).find(it => it.id === props.match.params.cardId),
                          'name',
                          'exp_month',
                          'exp_year',
                          'address_zip',
                          'address_state',
                          'address_city',
                          'address_country',
                          'address_line1',
                          'address_line2'
                        )}
                        btnSubmitText="Save"
                        success="The Payment Method updated successfully"
                      >
                        {({ doc, invalid, submitting }) => (
                          <FormSection name="">
                            <CardUpdating doc={doc} />
                          </FormSection>
                        )}
                      </FormDialog>
                    </div>
                  )}
                />
              </Switch>
            </React.Fragment>
          )}
        </Query>
      )}
    </Mutation>
  </React.Fragment>
)

const styles = theme => ({
  cardHeader: {
    display: 'flex'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
})

const enhance = compose(
  injectStripe,
  withState('expanded', 'setExpanded', null),
  withSnackbar,
  withStyles(styles)
)

export default enhance(Billing)
