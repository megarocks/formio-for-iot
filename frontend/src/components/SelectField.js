import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { get } from 'lodash/fp'

import { DeviceDefinitionContext } from '../App.js'

const SelectField = ({ fieldName, options, placeHolder, label, onCreate, ...restProps }) => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

  const defaultGetOptionLabel = option => option?.label
  const defaultGetOptionValue = option => option?.value

  const getOptionLabel = restProps.getOptionLabel || defaultGetOptionLabel
  const getOptionValue = restProps.getOptionValue || defaultGetOptionValue

  const rawEntities = options
  const selected = get(`values.${fieldName}`, formik)

  const getSelected = () => {
    if (Array.isArray(selected)) {
      return selected.map(s => rawEntities.find(rE => getOptionValue(rE) === s))
    } else {
      return rawEntities.find(rE => getOptionValue(rE) === selected)
    }
  }

  const onChange = updatedSelection => {
    if (Array.isArray(updatedSelection)) {
      formik.setFieldValue(fieldName, updatedSelection.map(getOptionValue))
    } else {
      formik.setFieldValue(fieldName, getOptionValue(updatedSelection))
    }
  }

  const onBlur = () => {
    formik.setFieldTouched(fieldName, true, true)
  }

  const selectProps = {
    options: rawEntities,
    isMulti: true,
    onChange,
    onBlur,
    name: fieldName,
    placeholder: placeHolder,
    value: getSelected(),
    closeMenuOnSelect: true,
    getOptionLabel,
    getOptionValue,
    ...restProps
  }

  return (
    <div className='form-group'>
      <label htmlFor={fieldName}>{label}</label>
      <CreatableSelect {...selectProps} />
    </div>
  )
}

export default SelectField
