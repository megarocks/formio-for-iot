import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { get } from 'lodash/fp'

import { Context } from './App'
import useSelectorOptions from './useSelectorOptions'
import { createOption, createOnChangeHandler, createFieldPath } from './utils'
import ArgumentsPanel from './ArgumentsPanel'

const CommandsInputs = ({ capabilityPath }) => {
  const context = React.useContext(Context)
  const formik = context.formik

  const { commandsOptions, createNewCommand } = useSelectorOptions()

  const capability = capabilityPath ? get(capabilityPath, formik.values) || {} : formik.values
  const commandNames = Object.keys(capability.commands || {})
  const selectedCommandOptions = commandNames.map(createOption)
  const onCommandsSelectorChange = createOnChangeHandler({
    fieldPath: createFieldPath([capabilityPath, 'commands']),
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
          key={commandName + 'args-panel'}
          listsNames={listsNames}
          commandName={commandName}
          argumentsPath={createFieldPath([capabilityPath, 'commands', commandName, 'arguments'])}
        />
      ))}
    </div>
  )
}

export default CommandsInputs
