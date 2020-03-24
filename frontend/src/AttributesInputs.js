import React from 'react'
import SelectField from './components/SelectField'
import { get } from 'lodash/fp'
import SimpleField from './components/SimpleField'
import { DeviceDefinitionContext } from './App'
import { schemaTypeOptions } from './constants'
import useSelectorOptions from './useSelectorOptions'
import CreatableSelect from 'react-select/creatable/dist/react-select.esm'
import { createOnChangeHandler, createOption } from './utils'

const AttributesInputs = ({ capabilityPath }) => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

  const {
    properties,
    createNewProperty,
    enumOptions,
    attributes,
    createNewAttribute,
  } = useSelectorOptions()

  const capabilityLists = get(`${capabilityPath}.lists`, formik.values) || {}
  const listsNames = Object.keys(capabilityLists)

  const attributesPath = `${capabilityPath}.attributes`
  const capabilityAttributes = get(attributesPath, formik.values) || {}
  const attributeNames = Object.keys(capabilityAttributes)

  const onAttributesSelectorChange = createOnChangeHandler({
    fieldPath: attributesPath,
    values: formik.values,
    setFieldValue: formik.setFieldValue,
  })

  return (
    <div className='border p-2 m-2'>
      <h4>Attributes:</h4>

      <CreatableSelect
        isMulti
        closeMenuOnSelect
        options={attributes}
        onCreateOption={createNewAttribute}
        value={attributeNames.map(createOption)}
        onChange={onAttributesSelectorChange}
      />

      {attributeNames.map((attributeName) => {
        const currentAttributeSchemaPath = `${attributesPath}.${attributeName}.schema`

        const propertiesPath = `${currentAttributeSchemaPath}.properties`
        const attributeProperties = get(propertiesPath, formik.values) || {}
        const propertyNames = Object.keys(attributeProperties)

        const onPropertySelectorChange = createOnChangeHandler({
          fieldPath: propertiesPath,
          values: formik.values,
          setFieldValue: formik.setFieldValue,
        })

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

            <label>Properties:</label>
            <CreatableSelect
              isMulti
              closeMenuOnSelect
              options={properties}
              onCreateOption={createNewProperty}
              value={propertyNames.map(createOption)}
              onChange={onPropertySelectorChange}
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
                      <SelectField
                        fieldName={`${propertyPath}.enum`}
                        label='Enum'
                        options={enumOptions}
                      />
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
                      <SimpleField
                        fieldName={`${propertyPath}.minimum`}
                        label='Minimum'
                        type='number'
                      />
                      <SimpleField
                        fieldName={`${propertyPath}.maximum`}
                        label='Maximum'
                        type='number'
                      />
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
