import React from 'react'
import { get } from 'lodash/fp'

import { DeviceDefintionContext } from '../App.js'

const SimpleField = ({ fieldName, label = '', placeholder = '', type = 'text' }) => {
  const context = React.useContext(DeviceDefintionContext)
  const formik = context.formik

  const value = get(`values.${fieldName}`, formik)

  return (
    <div className='form-group'>
      <label htmlFor={fieldName}>{label}</label>
      <input
        type={type}
        className='form-control'
        id={fieldName}
        placeholder={placeholder}
        name={fieldName}
        onChange={formik.handleChange}
        value={}
      />
    </div>
  )
}

export default SimpleField
