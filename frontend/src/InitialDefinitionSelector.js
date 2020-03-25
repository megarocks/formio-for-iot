import React from 'react'
import ReactSelect from 'react-select'

const InitialDefinitionSelector = ({ value, setInitialValues, definitions = [] }) => {
  const onChange = (selected) => {
    const selectedDefinition = definitions.find((d) => d.id === selected.value)
    setInitialValues(selectedDefinition)
  }

  const definitionsOptions = definitions.map((d) => ({ label: d.friendlyName, value: d.id }))

  return (
    <ReactSelect
      options={definitionsOptions}
      className='m-3'
      placeholder='Select device definition'
      value={definitionsOptions.find((d) => d.value === value)}
      onChange={onChange}
    />
  )
}

export default InitialDefinitionSelector
