import React, { useState } from 'react'
import { get } from 'lodash/fp'
import { createOption, getOptionValue } from './utils'
import CreatableSelect from 'react-select/creatable'
import CommandArgumentInputs from './CommandArgumentInputs'
import { DeviceDefinitionContext } from './App'

const ArgumentsPanel = ({ commandName, argumentsPath, listsNames }) => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

  const args = get(argumentsPath, formik.values) || []
  const [argumentOptions, setArgumentOptions] = useState(args.map((a) => createOption(a.name)))

  const onArgumentsSelection = (currentlySelected) => {
    const selectedOptions = (currentlySelected || []).map(getOptionValue)
    let newFieldValue = get(argumentsPath, formik.values) || []
    newFieldValue = selectedOptions.map((oneOfOptions) => {
      const argVal = newFieldValue.find((arg) => arg.name === oneOfOptions)
      if (argVal) return argVal
      else return { name: oneOfOptions }
    })
    formik.setFieldValue(argumentsPath, newFieldValue)
  }

  return (
    <div className='m-2 p-2 border' key={`${argumentsPath}.argumentNames`}>
      <label>{commandName} arguments:</label>
      <CreatableSelect
        isMulti
        closeMenuOnSelect
        options={argumentOptions}
        value={args.map((a) => createOption(a.name))}
        onChange={onArgumentsSelection}
        onCreateOption={(newOption) => {
          setArgumentOptions([...argumentOptions, createOption(newOption)])
        }}
      />

      {args.map((argument, idx) => {
        const argumentPath = `${argumentsPath}.${idx}`
        return (
          <CommandArgumentInputs
            key={argumentPath}
            argumentPath={argumentPath}
            listsNames={listsNames}
          />
        )
      })}
    </div>
  )
}

export default ArgumentsPanel
