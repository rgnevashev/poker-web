/** @format */

import numeral from 'numeral'

export const number = value => {
  const result = numeral(value)
  if (String(result.value()) !== result.input()) {
    return result.input()
  }
  return result.value()
}
