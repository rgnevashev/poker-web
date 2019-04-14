/** @format */

import React from 'react'
import PropTypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'
import Icon from '@material-ui/core/Icon'
import GridItem from 'components/Grid/GridItem'
import Button from 'components/CustomButtons/Button'
import GridContainer from 'components/Grid/GridContainer'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardBody from 'components/Card/CardBody'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'
import Table from 'components/Table/Table.jsx'

import dashboardStyle from 'assets/jss/material-dashboard-pro-react/views/dashboardStyle'
import { Query } from 'components'
import TextField from '@material-ui/core/TextField'
import { withSnackbar } from 'notistack'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { getOrderWithTag } from 'api/orders.graphql'
import { getUserWithTag } from 'api/users.graphql'

class OrderTag extends React.Component {
  state = { url: null, found: -1 }

  getTag(DSPTag) {
    const { classes, enqueueSnackbar } = this.props
    const { url, found } = this.state

    if (!DSPTag) return null

    return (
      <CardBody>
        <Chip label={DSPTag.tag.replace('https://tag.simpli.fi', `${process.env.REACT_APP_API_URL}/v1/tag`)} color="default" />
        <CopyToClipboard
          text={DSPTag.tag.replace('https://tag.simpli.fi', `${process.env.REACT_APP_API_URL}/v1/tag`)}
          onCopy={() => enqueueSnackbar('The tag has been copied to clipboard', { variant: 'success' })}
        >
          <Button color="primary" variant="contained">
            <Icon>file_copy</Icon> Copy
          </Button>
        </CopyToClipboard>
        <p>
          <small>{DSPTag.description}</small>
        </p>
        <Divider />
        <TextField style={{ width: 575 }} onChange={e => this.setState({ url: e.target.value })} />

        <Button
          color="primary"
          disabled={!url || !/(http(s):\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/.test(url)}
          variant="contained"
          onClick={() => {
            fetch(`${process.env.REACT_APP_API_URL}/v1/checkTag`, {
              method: 'post',
              body: JSON.stringify({ url, tag: DSPTag.tag_identifier }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`${response.status}: ${response.statusText}`)
                }
                return response.json()
              })
              .then(res => {
                this.setState({ found: res.found })
                if (res.found) {
                  enqueueSnackbar('The tag has been found on the site.', { variant: 'success' })
                } else {
                  enqueueSnackbar('This tag could not be found on the site.', { variant: 'error' })
                }
              })
          }}
        >
          <Icon>check_circle</Icon> Test
        </Button>
        {found !== -1 && (
          <p>
            <Chip label={found ? 'The tag has been found on the site.' : 'This tag could not be found on the site.'} color={found ? 'primary' : 'secondary'} />
          </p>
        )}
        <p>
          <small>Enter a full URL below to verify Tag is correctly installed.</small>
        </p>

        {DSPTag.segments && DSPTag.segments.length > 0 && (
          <div>
            <br />
            <br />
            <br />
            <CardHeader color="success">
              <Icon style={{ float: 'left', marginRight: 10 }}>table_chart</Icon>
              <h4 className={classes.cardTitleWhite}>Smart Pixel Segments Data</h4>
            </CardHeader>
            <Table
              tableHeaderColor="warning"
              tableHead={['Segment Name', 'Users', 'Last Activity']}
              tableData={DSPTag.segments.map(segment => {
                return [segment.name, segment.user_count, segment.last_activity]
              })}
            />
          </div>
        )}
      </CardBody>
    )
  }

  render() {
    const { classes, match, forUser } = this.props

    return (
      <React.Fragment>
        <Query query={forUser ? getUserWithTag : getOrderWithTag} variables={{ id: forUser ? forUser : match.params.orderId }}>
          {({ orderWithTag: order = {}, user = {}, loading }) => {
            if (loading) return 'Loading...'
            return (
              <GridContainer>
                <GridItem sm={12}>
                  <Card>
                    <CardHeader color="warning">
                      <Icon style={{ float: 'left', marginRight: 10 }}>code</Icon>
                      <h4 className={classes.cardTitleWhite}>Smart Pixel Code</h4>
                    </CardHeader>
                    {this.getTag(forUser ? user.DSPTagForced : order.DSPTag)}
                  </Card>
                </GridItem>
              </GridContainer>
            )
          }}
        </Query>
      </React.Fragment>
    )
  }
}

OrderTag.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(withSnackbar(OrderTag))
