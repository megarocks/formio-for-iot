import React from 'react'
import ReactSelect from 'react-select'

const InitialDefinitionSelector = ({ value, setInitialValues, definitions = [], label = 'Select template' }) => {
  const onChange = (selected) => {
    const selectedDefinition = definitions.find((d) => d.id === selected.value)
    setInitialValues(selectedDefinition)
  }

  const definitionsOptions = definitions.map((d) => ({ label: `${d.friendlyName} (${d.id})`, value: d.id }))

  return (
    <div className='row mt-3'>
      <div className='col-sm'>
        <div className='form-group'>
          <label>{label}</label>
          <ReactSelect
            options={definitionsOptions}
            placeholder={label}
            value={definitionsOptions.find((d) => d.value === value)}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}

export default InitialDefinitionSelector
