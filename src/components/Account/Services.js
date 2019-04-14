/** @format */

import React from 'react'

//import { Form, FormSection, Profile } from 'components'
//import { TextField, Checkbox } from 'lib/redux-form-material-ui'

import { connectWithService } from 'api/actions'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import GridItem from 'components/Grid/GridItem'
import GridContainer from 'components/Grid/GridContainer'
import Button from 'components/CustomButtons/Button'
import Card from 'components/Card/Card'
import CardHeader from 'components/Card/CardHeader'
import CardBody from 'components/Card/CardBody'
import CardFooter from 'components/Card/CardFooter'

import AppContext from 'AppContext'

const Services = ({ classes, history, match }) => (
  <GridContainer>
    <GridItem xs={12}>
      <AppContext.Consumer>
        {({ user }) => (
          <React.Fragment>
            <Card>
              <CardHeader color="info">
                <Typography variant="h5" color="inherit">
                  Services
                </Typography>
              </CardHeader>
              <CardBody>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={
                        user.services.stripe ? (
                          <p>Connected as {user.services.stripe.stripe_user_id}</p>
                        ) : (
                          <div>
                            <p>
                              <a className="stripe-connect-button" onClick={() => connectWithService(user.id, 'stripe')}>
                                <span>Connect with Stripe</span>
                              </a>
                            </p>
                            <p>
                              <small>
                                By registering your account, you agree to our{' '}
                                <a href="https://leadfollow.io/services" target="_blank">
                                  Services Agreement
                                </a>{' '}
                                and the{' '}
                                <a href="https://stripe.com/connect-account/legal" target="_blank">
                                  Stripe Connected Account Agreement.
                                </a>
                              </small>
                            </p>
                          </div>
                        )
                      }
                    />
                  </ListItem>
                </List>
              </CardBody>
            </Card>
            {console.log(user)}
          </React.Fragment>
        )}
      </AppContext.Consumer>
    </GridItem>
  </GridContainer>
)

const styles = () => ({})

export default withStyles(styles)(Services)
