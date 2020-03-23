import React from 'react'
import { get } from 'lodash/fp'

import SelectField from './components/SelectField'
import CommandArgumentInputs from './CommandArgumentInputs'
import { DeviceDefinitionContext } from './App'
import useSelectorOptions from './useSelectorOptions'

const CommandsInputs = ({ capabilityPath, listsNames, commandNames }) => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

  const { commandsOptions, createNewCommand } = useSelectorOptions()

  return (
    <div className='border p-2 m-2'>
      <SelectField
        label='Commands'
        options={commandsOptions}
        fieldName={`${capabilityPath}.commandNames`}
        onCreateOption={createNewCommand}
      />

      {commandNames.map(commandName => {
        const capabilityCommandPath = `${capabilityPath}.commands.${commandName}`
        const commandArguments = get(`${capabilityCommandPath}.arguments`, formik.values) || []
        const argumentNames = commandArguments.map(a => a.name)

        const createArgument = created => {
          formik.setFieldValue(`${capabilityCommandPath}.argumentNames`, [...argumentNames, created])
          formik.setFieldValue(`${capabilityCommandPath}.arguments`, [...commandArguments, { name: created }])
        }
        const options = argumentNames.map(a => ({ label: a, value: a }))

        return (
          <div className='m-2 p-2 border' key={`${capabilityCommandPath}.argumentNames`}>
            <SelectField
              options={options}
              fieldName={`${capabilityCommandPath}.argumentNames`}
              label={`${commandName} arguments`}
              onCreateOption={createArgument}
            />

            {commandArguments.map((argument, idx) => {
              const argumentPath = `${capabilityCommandPath}.arguments.${idx}`
              return <CommandArgumentInputs key={argumentPath} argumentPath={argumentPath} listsNames={listsNames} />
            })}
          </div>
        )
      })}
    </div>
  )
}

export default CommandsInputs
