/** @format */

import React from 'react'
import PropTypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'
import Icon from '@material-ui/core/Icon'
import GridItem from 'components/Grid/GridItem'
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardIcon from 'components/Card/CardIcon'
import CardBody from 'components/Card/CardBody'
import CardFooter from 'components/Card/CardFooter'
import DateRange from '@material-ui/icons/DateRange'
import Table from 'components/Table/Table.jsx'
import Button from 'components/CustomButtons/Button'

import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'
import { Query, Mutation } from 'components'

import { getOrderStats } from 'api/orders.graphql'

import ChartistGraph from 'react-chartist'
import { dailySalesChart } from 'variables/charts.jsx'
import AppContext from 'AppContext'

import numeral from 'numeral'
import _ from 'lodash'

const OrderStats = ({ classes, history, match }) => (
  <React.Fragment>
    <AppContext.Consumer>
      {({ user }) => (
        <Query query={getOrderStats} variables={{ id: match.params.orderId }}>
          {({ orderStats, loading }) => {
            if (loading) return 'Loading...'
            if (!orderStats) orderStats = {}
            let impressionsChart = JSON.parse(JSON.stringify(dailySalesChart))
            if (orderStats.DSPCampaignStatsHistory) {
              impressionsChart.data = {
                labels: orderStats.DSPCampaignStatsHistory.map(stat => stat.stat_date.substring(5).replace('-', '/')),
                series: [orderStats.DSPCampaignStatsHistory.map(stat => stat.impressions)]
              }
              impressionsChart.options.high = orderStats.DSPCampaignStatsHistory.length
                ? _.maxBy(orderStats.DSPCampaignStatsHistory, 'impressions').impressions * 1.1
                : 0
            }

            let clicksChart = JSON.parse(JSON.stringify(dailySalesChart))
            if (orderStats.DSPCampaignStatsHistory) {
              clicksChart.data = {
                labels: orderStats.DSPCampaignStatsHistory.map(stat => stat.stat_date.substring(5).replace('-', '/')),
                series: [orderStats.DSPCampaignStatsHistory.map(stat => stat.clicks)]
              }
              clicksChart.options.high = orderStats.DSPCampaignStatsHistory.length ? _.maxBy(orderStats.DSPCampaignStatsHistory, 'clicks').clicks * 1.1 : 0
            }

            return (
              <div>
                {!orderStats.DSPCampaignStats && (
                  <GridContainer>
                    <GridItem xs={12} className={classes.gridItemHead}>
                      <CardHeader color="warning" style={{ marginBottom: 40 }}>
                        <b>DSP Campaign Stats Not Available</b>
                      </CardHeader>
                    </GridItem>
                  </GridContainer>
                )}
                {orderStats.DSPCampaignStats && (
                  <GridContainer>
                    <GridItem xs={12} className={classes.gridItemHead}>
                      <CardHeader color="success">
                        <b>DSP Campaign Stats</b>
                      </CardHeader>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>Impressions</p>
                          <h3 className={classes.cardTitle}>{numeral(orderStats.DSPCampaignStats.impressions).format('0,0') || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>Clicks</p>
                          <h3 className={classes.cardTitle}>{orderStats.DSPCampaignStats.clicks || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>CTR</p>
                          <h3 className={classes.cardTitle}>{numeral(orderStats.DSPCampaignStats.ctr).format('0.000') || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>CPM</p>
                          <h3 className={classes.cardTitle}>{numeral(orderStats.DSPCampaignStats.cpm).format('0.000') || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>CPC</p>
                          <h3 className={classes.cardTitle}>{numeral(orderStats.DSPCampaignStats.cpc).format('0.000') || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>CPA</p>
                          <h3 className={classes.cardTitle}>{numeral(orderStats.DSPCampaignStats.cpa).format('0.000') || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} lg={6}>
                      <Card chart>
                        <CardHeader color="info">
                          <ChartistGraph
                            className="ct-chart-white-colors"
                            data={impressionsChart.data}
                            type="Line"
                            options={impressionsChart.options}
                            listener={impressionsChart.animation}
                          />
                        </CardHeader>
                        <CardBody>
                          <h4 className={classes.cardTitle}>Impressions</h4>
                          <p className={classes.cardCategory}>Ad Impressions</p>
                        </CardBody>
                        <CardFooter chart>
                          <div className={classes.stats}>
                            <DateRange /> Last 2 weeks
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} lg={6}>
                      <Card chart>
                        <CardHeader color="primary">
                          <ChartistGraph
                            className="ct-chart-white-colors"
                            data={clicksChart.data}
                            type="Line"
                            options={clicksChart.options}
                            listener={clicksChart.animation}
                          />
                        </CardHeader>
                        <CardBody>
                          <h4 className={classes.cardTitle}>Clicks</h4>
                          <p className={classes.cardCategory}>Ad Clicks</p>
                        </CardBody>
                        <CardFooter chart>
                          <div className={classes.stats}>
                            <DateRange /> Last 2 weeks
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    {orderStats.reports && orderStats.reports.length && (
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardHeader color="warning">
                            <h4 className={classes.cardTitleWhite}>Reports</h4>
                          </CardHeader>
                          <CardBody>
                            <GridContainer>
                              {orderStats.reports.map(report => {
                                return (
                                  <GridItem key={report.templateId} xs={12} sm={6} md={6}>
                                    <Button
                                      color="success"
                                      variant="contained"
                                      fullWidth
                                      onClick={() => history.push(`${match.url.replace('/stats', '')}/order-report/${report.templateId}`)}
                                    >
                                      {report.template.category}: {report.template.title}
                                    </Button>
                                  </GridItem>
                                )
                              })}
                            </GridContainer>
                          </CardBody>
                        </Card>
                      </GridItem>
                    )}

                    {orderStats.DSPCampaignStatsPerAd && (
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Per Ad Stats</h4>
                          </CardHeader>
                          <CardBody>
                            <Table
                              tableHeaderColor="warning"
                              tableHead={['Creative', 'Name', 'Impressions', 'Clicks', 'CTR' /*,'CPM','CPC'*/]}
                              tableData={orderStats.DSPCampaignStatsPerAd.map(ad => {
                                return [
                                  <img src={ad.ads[0].primary_creative_url} height={32} />,
                                  ad.ads[0].name,
                                  numeral(ad.impressions).format('0,0.[000]') || 0,
                                  numeral(ad.clicks).format('0,0.[000]') || 0,
                                  numeral(ad.ctr).format('0,0.[000]') || 0
                                  /*numeral(ad.cpm).format('0,0.[000]') || 0,
                                numeral(ad.cpc).format('0,0.[000]') || 0*/
                                ]
                              })}
                            />
                          </CardBody>
                        </Card>
                      </GridItem>
                    )}
                  </GridContainer>
                )}

                {!orderStats.FBCampaignStats && (
                  <GridContainer>
                    <GridItem xs={12} className={classes.gridItemHead}>
                      <CardHeader color="warning">
                        <b>Facebook Ad Campaign Stats Not Available</b>
                      </CardHeader>
                    </GridItem>
                  </GridContainer>
                )}
                {orderStats.FBCampaignStats && (
                  <GridContainer>
                    <GridItem xs={12} className={classes.gridItemHead}>
                      <CardHeader color="success">
                        <b>Facebook Ad Campaign Stats</b>
                      </CardHeader>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>Impressions</p>
                          <h3 className={classes.cardTitle}>{orderStats.FBCampaignStats.impressions || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>Clicks</p>
                          <h3 className={classes.cardTitle}>{orderStats.FBCampaignStats.clicks || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>CTR</p>
                          <h3 className={classes.cardTitle}>{numeral(orderStats.FBCampaignStats.ctr).format('0.000') || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>CPM</p>
                          <h3 className={classes.cardTitle}>{numeral(orderStats.FBCampaignStats.cpm).format('0.000') || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>CPC</p>
                          <h3 className={classes.cardTitle}>{numeral(orderStats.FBCampaignStats.cpc).format('0.000') || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} md={6} lg={4} xl={2}>
                      <Card>
                        <CardHeader color="warning" stats icon>
                          <CardIcon color="warning">
                            <Icon>show_chart</Icon>
                          </CardIcon>
                          <p className={classes.cardCategory}>CPA</p>
                          <h3 className={classes.cardTitle}>{orderStats.FBCampaignStats.cpa || 0}</h3>
                        </CardHeader>
                        <CardFooter stats>
                          <div className={classes.stats}>
                            <DateRange />
                            All Time
                          </div>
                        </CardFooter>
                      </Card>
                    </GridItem>
                  </GridContainer>
                )}
              </div>
            )
          }}
        </Query>
      )}
    </AppContext.Consumer>
  </React.Fragment>
)

OrderStats.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(OrderStats)
