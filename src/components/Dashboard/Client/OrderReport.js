/** @format */

import React from 'react'
import PropTypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'
import GridItem from 'components/Grid/GridItem'
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardBody from 'components/Card/CardBody'
import Table from 'components/Table/Table.jsx'
import Button from 'components/CustomButtons/Button'

import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'
import { Query } from 'components'
import CircularProgress from '@material-ui/core/CircularProgress'

import { getOrderReport } from 'api/orders.graphql'

import html2pdf from 'html2pdf.js'

const OrderReport = ({ classes, history, match }) => (
  <React.Fragment>
    <Query
      query={getOrderReport}
      loader={
        <div className="text-center">
          <CircularProgress />
        </div>
      }
      variables={{ templateId: match.params.templateId, orderId: match.params.orderId }}
    >
      {({ orderReport, loading }) => {
        if (!orderReport) orderReport = { template: {} }
        return (
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Button color="warning" variant="contained" onClick={() => history.push(`/orders/${match.params.orderId}/stats`)}>
                Back To Campaign Statistics
              </Button>
              <Button
                color="success"
                variant="contained"
                onClick={() =>
                  console.log(
                    html2pdf()
                      .from(document.getElementById('element-to-print'))
                      .save(`${orderReport.template.category}: ${orderReport.template.title}.pdf`)
                  )
                }
              >
                Save to PDF
              </Button>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>
                    {orderReport.template.category}: {orderReport.template.title}
                  </h4>
                </CardHeader>
                <CardBody id="element-to-print">
                  {orderReport.values === '[]' && <h3>No data available...</h3>}
                  <Table tableHeaderColor="warning" tableHead={orderReport.fields || []} tableData={JSON.parse(orderReport.values || '[]')} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        )
      }}
    </Query>
  </React.Fragment>
)

OrderReport.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(OrderReport)
