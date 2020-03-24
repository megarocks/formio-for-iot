import React from 'react'
import SelectField from './components/SelectField'
import { get } from 'lodash/fp'
import SimpleField from './components/SimpleField'
import { DeviceDefinitionContext } from './App'
import { schemaTypeOptions } from './constants'
import useSelectorOptions from './useSelectorOptions'

const AttributesInputs = ({ capabilityPath, listsNames = [], attributeNames = [] }) => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

  const { properties, createNewProperty, enumOptions, attributes, createNewAttribute } = useSelectorOptions()

  return (
    <div className='border p-2 m-2'>
      <h4>Attributes:</h4>
      <SelectField
        options={attributes}
        fieldName={`${capabilityPath}.attributeNames`}
        onCreateOption={createNewAttribute}
      />
      {attributeNames.map((attributeName) => {
        const currentAttributeSchemaPath = `${capabilityPath}.attributes.${attributeName}.schema`
        const propertyNames = get(`${currentAttributeSchemaPath}.propertyNames`, formik.values) || []

        return (
          <div className='border m-2 p-2' key={currentAttributeSchemaPath}>
            <h5>Attribute {attributeName}:</h5>
            <SelectField
              isMulti={false}
              fieldName={`${currentAttributeSchemaPath}.type`}
              label='Schema Type'
              options={schemaTypeOptions}
            />
            <SimpleField
              fieldName={`${currentAttributeSchemaPath}.additionalProperties`}
              type='checkbox'
              inputProps={{
                checked: get(`${currentAttributeSchemaPath}.additionalProperties`, formik.values),
              }}
              label='Additional Properties'
            />
            <SelectField
              fieldName={`${currentAttributeSchemaPath}.propertyNames`}
              label='Properties'
              options={properties}
              onCreateOption={createNewProperty}
            />
            <SelectField
              fieldName={`${currentAttributeSchemaPath}.required`}
              label='Required Properties'
              options={propertyNames.map((p) => ({ label: p, value: p }))}
            />
            {propertyNames.map((propertyName) => {
              const propertyPath = `${currentAttributeSchemaPath}.properties.${propertyName}`
              const propertyType = get(`${propertyPath}.type`, formik.values)
              return (
                <div className='m-2 p-2 border' key={propertyPath}>
                  <h6>Property {propertyName}:</h6>
                  <SimpleField fieldName={`${propertyPath}.title`} label={`Title:`} />
                  <SelectField
                    isMulti={false}
                    fieldName={`${propertyPath}.type`}
                    label='Type'
                    options={schemaTypeOptions}
                  />

                  {propertyType === 'string' && (
                    <>
                      <SelectField fieldName={`${propertyPath}.enum`} label='Enum' options={enumOptions} />
                      {!!listsNames.length && (
                        <SelectField
                          isMulti={false}
                          fieldName={`${propertyPath}.list`}
                          label='List'
                          options={listsNames.map((l) => ({ label: l, value: l }))}
                        />
                      )}
                    </>
                  )}

                  {propertyType === 'integer' && (
                    <>
                      <SimpleField fieldName={`${propertyPath}.minimum`} label='Minimum' type='number' />
                      <SimpleField fieldName={`${propertyPath}.maximum`} label='Maximum' type='number' />
                    </>
                  )}

                  <SimpleField
                    fieldName={`${propertyPath}.default`}
                    label={`Default:`}
                    type={propertyType === 'string' ? 'text' : 'number'}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default AttributesInputs
