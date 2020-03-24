import React from 'react'
import { get } from 'lodash/fp'

import { DeviceDefinitionContext } from '../App.js'

const SimpleField = ({
  fieldName,
  label = '',
  placeholder = '',
  type = 'text',
  inputProps = {},
}) => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

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
        value={get(`values.${fieldName}`, formik) || ''}
        {...inputProps}
      />
    </div>
  )
}

export default SimpleField
