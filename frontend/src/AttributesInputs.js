import React from 'react'
import SelectField from './components/SelectField'
import { get } from 'lodash/fp'
import SimpleField from './components/SimpleField'
import { Context } from './App'
import { schemaTypeOptions } from './constants'
import useSelectorOptions from './useSelectorOptions'
import CreatableSelect from 'react-select/creatable/dist/react-select.esm'
import { createFieldPath, createOnChangeHandler, createOption } from './utils'

const AttributesInputs = ({ capabilityPath }) => {
  const context = React.useContext(Context)
  const formik = context.formik

  const {
    properties,
    createNewProperty,
    enumOptions,
    attributes,
    createNewAttribute,
  } = useSelectorOptions()

  const capabilityLists = get(createFieldPath([capabilityPath, 'lists']), formik.values) || {}
  const listsNames = Object.keys(capabilityLists)

  const attributesPath = createFieldPath([capabilityPath, 'attributes'])
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
        const currentAttributeSchemaPath = createFieldPath([
          attributesPath,
          attributeName,
          'schema',
        ])

        const propertiesPath = createFieldPath([currentAttributeSchemaPath, 'properties'])
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
              fieldName={createFieldPath([currentAttributeSchemaPath, 'type'])}
              label='Schema Type'
              options={schemaTypeOptions}
            />

            <SimpleField
              fieldName={createFieldPath([currentAttributeSchemaPath, 'additionalProperties'])}
              type='checkbox'
              inputProps={{
                checked: get(
                  createFieldPath([currentAttributeSchemaPath, 'additionalProperties']),
                  formik.values
                ),
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
              fieldName={createFieldPath([currentAttributeSchemaPath, 'required'])}
              label='Required Properties'
              options={propertyNames.map((p) => ({ label: p, value: p }))}
            />

            {propertyNames.map((propertyName) => {
              const propertyPath = createFieldPath([
                currentAttributeSchemaPath,
                'properties',
                propertyName,
              ])
              const propertyType = get(createFieldPath([propertyPath, 'type']), formik.values)
              return (
                <div className='m-2 p-2 border' key={propertyPath}>
                  <h6>Property {propertyName}:</h6>
                  <SimpleField
                    fieldName={createFieldPath([propertyPath, 'title'])}
                    label={`Title:`}
                  />
                  <SelectField
                    isMulti={false}
                    fieldName={createFieldPath([propertyPath, 'type'])}
                    label='Type'
                    options={schemaTypeOptions}
                  />

                  {propertyType === 'string' && (
                    <>
                      <SelectField
                        fieldName={createFieldPath([propertyPath, 'enum'])}
                        label='Enum'
                        options={enumOptions}
                      />
                      {!!listsNames.length && (
                        <SelectField
                          isMulti={false}
                          fieldName={createFieldPath([propertyPath, 'list'])}
                          label='List'
                          options={listsNames.map((l) => ({ label: l, value: l }))}
                        />
                      )}
                    </>
                  )}

                  {propertyType === 'integer' && (
                    <>
                      <SimpleField
                        fieldName={createFieldPath([propertyPath, 'minimum'])}
                        label='Minimum'
                        type='number'
                      />
                      <SimpleField
                        fieldName={createFieldPath([propertyPath, 'maximum'])}
                        label='Maximum'
                        type='number'
                      />
                    </>
                  )}

                  <SimpleField
                    fieldName={createFieldPath([propertyPath, 'default'])}
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
