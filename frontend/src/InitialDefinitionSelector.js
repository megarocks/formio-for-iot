import React, { useContext } from 'react'
import ReactSelect from 'react-select'

import useSelectorOptions from './useSelectorOptions'
import { DeviceDefinitionContext } from './App'

const InitialDefinitionSelector = ({ value, setInitialValues }) => {
  const { allDefinitions } = useContext(DeviceDefinitionContext)
  const { definitions } = useSelectorOptions()
  const onChange = selected => {
    const selectedDefinition = allDefinitions.find(d => d.id === selected.value)
    setInitialValues(selectedDefinition)
  }

  return (
    <ReactSelect
      options={definitions}
      className='m-3'
      placeholder='Select device definition'
      value={definitions.find(d => d.value === value)}
      onChange={onChange}
    />
  )
}

export default InitialDefinitionSelector
