/** @format */

import React from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import format from 'date-fns/format'

export default ({ input, type = 'text', meta: { touched, invalid, error }, select, options = [], multiple = false, ...rest }) => (
  <TextField
    type={type}
    margin="normal"
    fullWidth
    {...input}
    value={type === 'date' ? format(input.value, 'YYYY-MM-DD') : multiple ? input.value || [] : input.value}
    error={touched && invalid}
    helperText={touched && error}
    select={select}
    SelectProps={{ multiple }}
    {...rest}
  >
    {select &&
      Array.from(options).map(({ value, label, ...option }) => (
        <MenuItem key={value} value={value} {...option}>
          {label}
        </MenuItem>
      ))}
    }
  </TextField>
)
