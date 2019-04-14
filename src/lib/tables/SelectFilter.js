/** @format */

import React from 'react'

const SelectFilter = ({ data, filter, onChange }) => (
  <select onChange={event => onChange(event.target.value)} style={{ width: '100%' }} value={filter ? filter.value : ''}>
    <option value="">Show All</option>
    {Array.from(data || []).map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))}
  </select>
)

export default SelectFilter
