import React from 'react'
import ReactSelect from 'react-select'

const InitialDefinitionSelector = ({ value, setInitialValues, definitions = [] }) => {
  const onChange = (selected) => {
    const selectedDefinition = definitions.find((d) => d.id === selected.value)
    setInitialValues(selectedDefinition)
  }

  const definitionsOptions = definitions.map((d) => ({ label: d.friendlyName, value: d.id }))

  return (
    <div className='row mt-3'>
      <div className='col-sm'>
        <div className='form-group'>
          <label>Initial values:</label>
          <ReactSelect
            options={definitionsOptions}
            placeholder='Select device definition'
            value={definitionsOptions.find((d) => d.value === value)}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}

export default InitialDefinitionSelector
