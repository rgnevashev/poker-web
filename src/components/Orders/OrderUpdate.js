/** @format */

import React from 'react'
import { compose, withStateHandlers } from 'recompose'
import { Query, Mutation, FormCard, Field } from 'components'
import { Tags, TextField, Checkbox, UploaderFiles, AutosuggestField } from 'lib/redux-form-material-ui'
import numeral from 'numeral'

import { getDataForOrderUpdating, updateOrder, createFBCampaign, createDSPCampaign } from 'api/orders.graphql'
import { getGeoAudiences } from 'api/geoAudiences.graphql'
import { getGeoEvents } from 'api/geoEvents.graphql'

import withStyles from '@material-ui/core/styles/withStyles'
import Button from 'components/CustomButtons/Button'
import Typography from '@material-ui/core/Typography'
import ListFiles from 'components/ListFiles'
import Nav from 'components/Nav'
import Divider from '@material-ui/core/Divider'

import { required, inclusion, numericality } from 'lib/validators'
import { number } from 'lib/normalizers'

import { campaignTypes, clientOrderStatus, orderFBStatus, orderDSPStatus } from 'variables/options'

const OrderUpdate = ({ classes, match, tabIndex, setTabIndex }) => (
  <React.Fragment>
    <Query query={getDataForOrderUpdating} variables={match.params}>
      {({ order, products, conversationalPages, geoAudiences }) => (
        <Mutation mutation={createFBCampaign} variables={{ id: order.id }} refetchQueries={['getDataForOrderUpdating']}>
          {createFBCampaign => (
            <Mutation mutation={createDSPCampaign} variables={{ id: order.id }} refetchQueries={['getDataForOrderUpdating']}>
              {createDSPCampaign => (
                <FormCard
                  title="Update Order"
                  form="OrderUpdate"
                  mutation={updateOrder}
                  refetchQueries={['getOrders']}
                  initialValues={order}
                  success="Order saved successfully"
                  onSubmit={(update, data) => update({ variables: { ...match.params, data: { ...data, budget: numeral(data.budget).value() } } })}
                >
                  {({ doc, invalid, submitting, enqueueSnackbar }) => (
                    <React.Fragment>
                      <Nav
                        color="info"
                        items={[
                          { key: 'General', title: 'General' },
                          { key: 'List', title: 'List' },
                          { key: 'Campaign', title: 'Campaign' },
                          { key: 'CLP', title: 'CLP' },
                          { key: 'Geo Targets', title: 'Geo Targets' },
                          { key: 'Geo Events', title: 'Geo Events' },
                          { key: 'Reports', title: 'Reports' }
                        ]}
                        activeKey={tabIndex}
                        onChange={setTabIndex}
                      />
                      {tabIndex === 'General' && (
                        <React.Fragment>
                          <Field
                            name="budget"
                            component={TextField}
                            label="Budget for this Campaign Element"
                            helperText="Please enter the budget for this Campaign Element. This may not be the Invoice total but what is to be applied to this element. "
                            validate={[required(), numericality()]}
                          />
                          <Field
                            name="productId"
                            component={TextField}
                            label="Order Product"
                            options={Array.from(products.data || []).map(it => ({ label: it.name, value: it.id }))}
                            validate={[required(), inclusion({ in: Array.from(products.data || []).map(it => it.id) })]}
                            select
                          />
                          {order.billing === 'pre_paid' && (
                            <React.Fragment>
                              <Field name="invoiceNumber" component={TextField} label="Invoice Number" />
                              <Field name="amount" component={TextField} label="Amount" value={doc.amount || doc.budget} validate={[numericality()]} />
                              {doc.amount > 0 && doc.amount !== doc.budget && (
                                <React.Fragment>
                                  <Field
                                    name="amountNotes"
                                    component={TextField}
                                    label="Please explain why the Budget amount is not the same as the amount collected"
                                    multiline
                                  />
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          )}
                          <Field name="status" component={TextField} label="Order Status" options={clientOrderStatus} validate={[required()]} select />
                          <Field name="fbStatus" component={TextField} label="FB Status" options={orderFBStatus} select />
                          <Field name="dspStatus" component={TextField} label="DSP Status" options={orderDSPStatus} select />
                          <Field name="notes" component={TextField} label="Notes" multiline />
                          <Field name="description" component={TextField} label="Invoice Memo" multiline />
                          <Field name="footer" component={TextField} label="Invoice Footer" multiline />
                          <div>
                            {order.invoice && (
                              <Button href={order.invoice.invoice_pdf} color="primary" variant="contained" title="Invoice PDF" target="_blank">
                                Download Invoice
                              </Button>
                            )}
                          </div>
                        </React.Fragment>
                      )}
                      {tabIndex === 'List' && (
                        <React.Fragment>
                          <Field name="listName" component={TextField} label="List Name" validate={[required()]} />
                          <Field name="listType" component={TextField} label="Please explain where or how you obtained these leads" />
                          <Field
                            name="listFiles"
                            component={UploaderFiles}
                            label="Upload Files"
                            accept=".csv"
                            renderDropzone={() => (
                              <p>
                                Drag and Drop your List CSV Files here. You can upload more than one file at a time. All files uploaded together will be merged
                                into ONE LIST used for the campaign.
                              </p>
                            )}
                            multiple
                          >
                            {props => <ListFiles {...props} name="listFiles" />}
                          </Field>
                        </React.Fragment>
                      )}
                      {tabIndex === 'Campaign' && (
                        <React.Fragment>
                          <Field
                            name="campaignType"
                            component={TextField}
                            label="Select Which Campaign Type Applies"
                            options={campaignTypes}
                            validate={[required()]}
                            select
                          />
                          <Field name="campaignStartDate" component={TextField} type="date" label="Campaign Start Date" InputLabelProps={{ shrink: true }} />
                          <Field
                            name="campaignStartedDate"
                            component={TextField}
                            type="date"
                            label="Campaign Started Date"
                            InputLabelProps={{ shrink: true }}
                          />
                          <Field name="campaignEndedDate" component={TextField} type="date" label="Campaign End Date" InputLabelProps={{ shrink: true }} />
                          <Field placeholder="Add More Keywords, press Enter after each..." name="keywords" component={Tags} label="Keywords" fullWidth />
                          <Divider />

                          <Typography variant="h5" color="inherit">
                            Facebook Campaign
                          </Typography>
                          {order.CustomAudienceId ? (
                            <div>Campaign is {order.CustomAudienceId}</div>
                          ) : (
                            <div>
                              <Button color="success" onClick={() => createFBCampaign()}>
                                Create FB Ad Campaign and Custom Audience
                              </Button>
                            </div>
                          )}
                          <Field name="FBCampaignCustom" component={Checkbox} type="number" label="Use Custom Campaign Stats" />
                          {doc.FBCampaignCustom && (
                            <div>
                              <Field name="campaignReach" component={TextField} type="number" label="Reach" />
                              <Field name="campaignImpressions" component={TextField} type="number" label="Impressions" />
                              <Field name="campaignFrequency" component={TextField} type="number" label="Frequency" />
                              <Field name="campaignClicks" component={TextField} type="number" label="Clicks" />
                            </div>
                          )}
                          <Typography variant="h5" color="inherit">
                            DSP Campaign
                          </Typography>
                          {order.DSPCampaignId ? (
                            <div>Campaign is {order.DSPCampaignId}</div>
                          ) : (
                            <div>
                              <Button color="success" onClick={() => createDSPCampaign()}>
                                Create DSP Campaign and Addressable Targets
                              </Button>
                            </div>
                          )}
                          <Field name="DSPCampaignCustom" component={Checkbox} type="number" label="Use Custom Campaign Stats" />
                          {doc.DSPCampaignCustom && (
                            <div>
                              <Field name="DSPCampaignClicks" component={TextField} type="number" label="Clicks" />
                              <Field name="DSPCampaignCPM" component={TextField} type="number" label="CPM" />
                              <Field name="DSPCampaignCPC" component={TextField} type="number" label="CPC" />
                              <Field name="DSPCampaignCPA" component={TextField} type="number" label="CPA" />
                              <Field name="DSPCampaignImpressions" component={TextField} type="number" label="Impressions" />
                            </div>
                          )}
                        </React.Fragment>
                      )}
                      {tabIndex === 'CLP' && (
                        <React.Fragment>
                          <Field
                            name="pageId"
                            component={TextField}
                            label="CLP"
                            options={Array.from(conversationalPages.data || []).map(it => ({ label: it.name, value: it.id }))}
                            validate={[inclusion({ in: Array.from(conversationalPages.data || []).map(it => it.id) })]}
                            select
                          />
                        </React.Fragment>
                      )}
                      {tabIndex === 'Geo Targets' && (
                        <React.Fragment>
                          <Field
                            name="geoAudiences"
                            component={AutosuggestField}
                            label="Campaign Geofence Targets"
                            dataFormat={({ data }) => data.geoAudiences.data.map(target => ({ label: target.name, value: target.id }))}
                            query={getGeoAudiences}
                            isMulti
                          />
                        </React.Fragment>
                      )}
                      {tabIndex === 'Geo Events' && (
                        <React.Fragment>
                          <Field
                            name="geoEvents"
                            component={AutosuggestField}
                            dataFormat={({ data }) => data.geoEvents.data.map(target => ({ label: target.name, value: target.id }))}
                            query={getGeoEvents}
                            label="Campaign Geo Events"
                            isMulti
                          />
                        </React.Fragment>
                      )}
                      {tabIndex === 'Reports' && (
                        <React.Fragment>
                          <Typography variant="h5" color="inherit">
                            Reports
                          </Typography>
                          <Field
                            name="reportFiles"
                            component={UploaderFiles}
                            label="Upload Report Files"
                            accept=".pdf"
                            renderDropzone={() => <p>Drag and Drop Report Files here. You can upload more than one file at a time.</p>}
                            multiple
                          >
                            {props => <ListFiles {...props} name="reportFiles" />}
                          </Field>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </FormCard>
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </Query>
  </React.Fragment>
)

const styles = theme => ({
  root: {},
  button: {
    margin: theme.spacing.unit
  }
})

export default compose(
  withStateHandlers(({ match }) => ({ tabIndex: 'General' }), {
    setTabIndex: () => ({ key: tabIndex }) => ({ tabIndex })
  }),
  withStyles(styles)
)(OrderUpdate)
