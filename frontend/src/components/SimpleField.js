import React from 'react'
import { get } from 'lodash/fp'

import { Context } from '../App.js'

const SimpleField = ({
  fieldName,
  label = '',
  placeholder = '',
  type = 'text',
  inputProps = {},
}) => {
  const context = React.useContext(Context)
  const formik = context.formik

  let value = get(`values.${fieldName}`, formik)
  if (value === 0) value = '0'

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
        value={value || ''}
        {...inputProps}
      />
    </div>
  )
}

export default SimpleField
