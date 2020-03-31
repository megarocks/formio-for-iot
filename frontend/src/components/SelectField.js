import React, { useCallback, useMemo } from 'react'
import CreatableSelect from 'react-select/creatable'
import { get } from 'lodash/fp'

import { Context } from '../App.js'
import { getOptionLabel, getOptionValue } from '../utils'

let formik = {
  setFieldValue: () => {},
}

const SelectField = ({
  fieldName,
  placeHolder,
  label,
  options = [],
  onCreateOption,
  isMulti = true,
}) => {
  const context = React.useContext(Context)
  formik = context.formik

  // raw value stored at form state
  const fieldValue = get(`values.${fieldName}`, formik)

  // value as react select understands it
  // it can be array for multiselect, or string || number for simple select
  const value = useMemo(() => {
    if (Array.isArray(fieldValue)) {
      return fieldValue.map((s) => options.find((rE) => getOptionValue(rE) === s))
    } else {
      return options.find((rE) => getOptionValue(rE) === fieldValue)
    }
    // eslint-disable-next-line
  }, [JSON.stringify(fieldValue), options])

  // useCallback is used for optimization
  const onChange = useCallback(
    (updatedSelection) => {
      if (Array.isArray(updatedSelection)) {
        formik.setFieldValue(fieldName, updatedSelection.map(getOptionValue))
      } else {
        formik.setFieldValue(fieldName, getOptionValue(updatedSelection))
      }
    },
    [fieldName]
  )

  // useMemo is used to avoid re-rendering of underneath component three
  // see dependencies array to know when it will be re-rendered
  return useMemo(
    () => (
      <div className='form-group'>
        <label htmlFor={fieldName}>{label}</label>
        <CreatableSelect
          options={options}
          isMulti={isMulti}
          closeMenuOnSelect={true}
          onChange={onChange}
          name={fieldName}
          placeholder={placeHolder}
          value={value}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          onCreateOption={onCreateOption}
        />
      </div>
    ),
    // eslint-disable-next-line
    [options.length, JSON.stringify(value)]
  )
}

export default SelectField
