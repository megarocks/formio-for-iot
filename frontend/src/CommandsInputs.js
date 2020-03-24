import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { get, pick } from 'lodash/fp'

import CommandArgumentInputs from './CommandArgumentInputs'
import { DeviceDefinitionContext } from './App'
import useSelectorOptions from './useSelectorOptions'
import { createOption, getOptionValue } from './utils'
import ArgumentsPanel from './ArgumentsPanel'

function createOnChangeHandler({ fieldPath, values, setFieldValue }) {
  return (currentlySelected) => {
    const selectedOptions = (currentlySelected || []).map(getOptionValue)
    let newFieldValue = get(fieldPath, values)
    selectedOptions.forEach((option) => {
      if (!(option in newFieldValue)) newFieldValue[option] = {}
    })
    newFieldValue = pick(selectedOptions, newFieldValue)
    setFieldValue(fieldPath, newFieldValue)
  }
}

const CommandsInputs = ({ capabilityPath }) => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

  const { commandsOptions, createNewCommand } = useSelectorOptions()

  const capability = get(capabilityPath, formik.values)
  const commandNames = Object.keys(capability.commands || {})
  const selectedCommandOptions = commandNames.map(createOption)
  const onCommandsSelectorChange = createOnChangeHandler({
    fieldPath: `${capabilityPath}.commands`,
    values: formik.values,
    setFieldValue: formik.setFieldValue,
  })

  const listsNames = Object.keys(capability.lists || {})

  return (
    <div className='border p-2 m-2'>
      <CreatableSelect
        isMulti
        closeMenuOnSelect
        options={commandsOptions}
        onCreateOption={createNewCommand}
        value={selectedCommandOptions}
        onChange={onCommandsSelectorChange}
      />

      {commandNames.map((commandName) => (
        <ArgumentsPanel
          listsNames={listsNames}
          commandName={commandName}
          argumentsPath={`${capabilityPath}.commands.${commandName}.arguments`}
        />
      ))}
    </div>
  )
}

export default CommandsInputs
