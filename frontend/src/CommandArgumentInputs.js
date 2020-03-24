import React from 'react'
import { get } from 'lodash/fp'

import { DeviceDefinitionContext } from './App'
import { schemaTypeOptions } from './constants'
import useSelectorOptions from './useSelectorOptions'
import SimpleField from './components/SimpleField'
import SelectField from './components/SelectField'

const CommandArgumentInputs = ({ argumentPath, listsNames = [] }) => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

  const { enumOptions, createEnumOption } = useSelectorOptions()

  const argument = get(argumentPath, formik.values)
  const argumentType = argument?.schema?.type

  return (
    <div className='p-2 m-2 border'>
      <h5>Argument {argument.name}</h5>
      <SimpleField
        fieldName={`${argumentPath}.required`}
        type='checkbox'
        inputProps={{
          checked: get(`${argumentPath}.required`, formik.values),
        }}
        label='Required'
      />
      <SelectField
        isMulti={false}
        fieldName={`${argumentPath}.schema.type`}
        label='Schema Type'
        options={schemaTypeOptions}
      />
      <SimpleField fieldName={`${argumentPath}.schema.title`} label='Schema Title' />
      {(argumentType === 'integer' && (
        <>
          <SimpleField fieldName={`${argumentPath}.schema.minimum`} label='Minimum' type='number' />
          <SimpleField fieldName={`${argumentPath}.schema.maximum`} label='Maximum' type='number' />
        </>
      )) ||
        (argumentType === 'string' && (
          <>
            {!!listsNames.length && (
              <SelectField
                isMulti={false}
                fieldName={`${argumentPath}.schema.list`}
                label='List'
                options={listsNames.map((l) => ({ label: l, value: l }))}
              />
            )}
            <SelectField
              fieldName={`${argumentPath}.schema.enum`}
              options={enumOptions}
              label='Enum'
              onCreateOption={createEnumOption}
            />
          </>
        ))}
      <SimpleField
        fieldName={`${argumentPath}.schema.default`}
        label='Default'
        type={argumentType === 'string' ? 'text' : 'number'}
      />
    </div>
  )
}

export default CommandArgumentInputs
