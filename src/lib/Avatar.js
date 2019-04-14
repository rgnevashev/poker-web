/** @format */

import React from 'react'
import md5 from 'md5'
import url from 'url'

const Avatar = props => {
  const { avatar = '', name = '', email = '', size = 50, d = 'mm', round = true } = props
  const s = size
  const hash = md5(email || '')
  const initials = String(name)
    .split(' ')
    .map(v => v.substr(0, 1).toUpperCase())
    .slice(0, 2)
    .join('')
  const query = { s }
  let src = null

  if (avatar) {
    src = avatar
  } else if (initials && !email) {
    src = `https://fakeimg.pl/${s}/?text=${initials}&font=lobster&font_size=${Math.ceil(s * 0.6)}`
  } else {
    query.d = d
    src = url.format({
      protocol: 'https',
      hostname: 'secure.gravatar.com',
      pathname: `avatar/${hash}`,
      query
    })
  }

  const styles = {
    width: s,
    height: s
  }

  if (round) {
    styles.borderRadius = '50%'
  }

  return <img className="user-avatar" src={src} style={styles} alt={name} />
}

export default Avatar
