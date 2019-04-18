/** @format */

import Validators, { addValidator } from 'lib/redux-form-validators'

Object.assign(Validators.defaultOptions, {
  allowBlank: true
})

export * from 'lib/redux-form-validators'

export const password = addValidator({
  validator(options, value, allValues) {
    const length = options.length || 8
    if (value && (!/^(?=.*[0-9])(?=.*[a-zA-Z])(.+)$/.test(value) || value.length < length)) {
      return {
        id: 'form.errors.yaml',
        defaultMessage: 'Password must contain at least one number and one letter and be at least {length, number} characters long',
        values: { length }
      }
    }
  }
})
