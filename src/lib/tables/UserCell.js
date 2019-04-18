/** @format */

import React from 'react'

import Avatar from 'lib/Avatar'

import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PhoneIcon from '@material-ui/icons/Phone'

const UserCell = ({ user = {} }) => (
  <div className="d-flex flex-row">
    {user && (
      <React.Fragment>
        <Avatar {...user} style={{ marginRight: 7 }} size={40} round />
        <address className="d-flex flex-column m-l-5">
          <strong>{user.name}</strong>
          {user.email && (
            <span className="d-flex align-items-center">
              <MailOutlineIcon style={{ width: 20, height: 20 }} />{' '}
              <a className="m-l-5" href={`mailto:${user.email}`}>
                {user.email}
              </a>
            </span>
          )}
          {user.phone && (
            <span className="d-flex align-items-center">
              <PhoneIcon style={{ width: 20, height: 20 }} /> <span className="m-l-5">{user.phone}</span>
            </span>
          )}
        </address>
      </React.Fragment>
    )}
  </div>
)

export default UserCell
