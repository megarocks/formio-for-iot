import React, { useState } from 'react'
import { useFormik } from 'formik'
import { get } from 'lodash/fp'
import ReactJson from 'react-json-view'

import SimpleField from './components/SimpleField'
import SelectField from './components/SelectField'

import familyRoomReceiver from './examples/family_room_receiver (localized)'

export const DeviceDefinitionContext = React.createContext()

// TODO Questions:
// commands.arguments.schema.list only when string?
// commands.arguments.schema.title not every time. ok?
// commands.arguments.schema.type.object than what?

function App() {
  const formik = useFormik({
    // initialValues: {
    //   id: 'test',
    //   name: 'test',
    //   type: ['Receiver'],
    //   friendlyName: 'test',
    //   components: ['main'],
    //   location: 'test',
    //   supportedCapabilities: {
    //     main: ['audioMute'],
    //   },
    //   main: {
    //     audioMute: {
    //       id: 'test',
    //       version: 7,
    //       name: 'test',
    //       status: 'test',
    //       commandNames: ['setMute'],
    //       // commands: {
    //       //   setMute: {
    //       //     arguments: [
    //       //       {
    //       //         name: 'test',
    //       //         required: true,
    //       //         schema: {
    //       //           type: 'string',
    //       //           enum: ['muted', 'unmuted'],
    //       //         },
    //       //       },
    //       //     ],
    //       //   },
    //       // },
    //     },
    //   },
    // },
    initialValues: familyRoomReceiver,
    onSubmit: values => {
      console.log(values)
    },
  })

  const schemaTypeOptions = [
    { label: 'string', value: 'string' },
    { label: 'integer', value: 'integer' },
    { label: 'object', value: 'object' },
  ]

  const [typeOptions, setTypeOptions] = useState([
    { label: 'Receiver', value: 'Receiver' },
    { label: 'Media Player', value: 'Media Player' },
  ])

  const [capabilityOptions, setCapabilityOptions] = useState([
    { label: 'switch', value: 'switch' },
    { label: 'audioMute', value: 'audioMute' },
    { label: 'audioVolume', value: 'audioVolume' },
    { label: 'audioVolumedB', value: 'audioVolumedB' },
    { label: 'mediaInputSource', value: 'mediaInputSource' },
    { label: 'surroundMode', value: 'surroundMode' },
  ])

  const [componentOptions, setComponentOptions] = useState([
    { label: 'main', value: 'main' },
    { label: 'zone2', value: 'zone2' },
  ])

  const [commandsOptions, setCommandsOptions] = useState([
    { label: 'setMute', value: 'setMute' },
    { label: 'mute', value: 'setMute' },
    { label: 'unmute', value: 'unmute' },
    { label: 'setInputSource', value: 'setInputSource' },
    { label: 'getInputSource', value: 'getInputSource' },
    { label: 'setVolumedB', value: 'setVolumedB' },
    { label: 'getVolumedB', value: 'getVolumedB' },
    { label: 'setVolume', value: 'setVolume' },
    { label: 'getVolume', value: 'getVolume' },
    { label: 'volumeUp', value: 'volumeUp' },
    { label: 'volumeDown', value: 'volumeDown' },
    { label: 'on', value: 'on' },
    { label: 'off', value: 'off' },
  ])

  const [stringArgumentEnumOptions, setStringArgumentEnumOptions] = useState([
    { label: 'muted', value: 'muted' },
    { label: 'unmuted', value: 'unmuted' },
  ])

  const [listsOptions, setListsOptions] = useState([
    { label: 'inputs', value: 'inputs' },
    { label: 'modes', value: 'modes' },
  ])

  const [listItemOptions, setListItemOptions] = useState([
    { label: 'CBL/SAT', value: 'CBL/SAT' },
    { label: 'GAME', value: 'GAME' },
    { label: 'AUX', value: 'AUX' },
    { label: 'BD/DVD', value: 'BD/DVD' },
    { label: 'STRM BOX', value: 'STRM BOX' },
    { label: 'TV', value: 'TV' },
    { label: 'PHONO', value: 'PHONO' },
    { label: 'CD', value: 'CD' },
    { label: 'FM', value: 'FM' },
    { label: 'AM', value: 'AM' },
    { label: 'TUNER', value: 'TUNER' },
    { label: 'USB(Front)', value: 'USB(Front)' },
    { label: 'NET', value: 'NET' },
    { label: 'USB(toggle)', value: 'USB(toggle)' },
    { label: 'BT AUDIO', value: 'BT AUDIO' },
    { label: 'HDMI 5', value: 'HDMI 5' },
    { label: 'HDMI 6', value: 'HDMI 6' },
    { label: 'HDMI 7', value: 'HDMI 7' },

    { label: 'STEREO', value: 'STEREO' },
    { label: 'DIRECT', value: 'DIRECT' },
    { label: 'FILM', value: 'FILM' },
    { label: 'ACTION', value: 'ACTION' },
    { label: 'MUSICAL', value: 'MUSICAL' },
    { label: 'ORCHESTRA', value: 'ORCHESTRA' },
    { label: 'UNPLUGGED', value: 'UNPLUGGED' },
    { label: 'STUDIO-MIX', value: 'STUDIO-MIX' },
    { label: 'TV LOGIC', value: 'TV LOGIC' },
    { label: 'ALL CH STEREO', value: 'ALL CH STEREO' },
    { label: 'THEATER', value: 'THEATER' },
    { label: 'ENHANCED', value: 'ENHANCED' },
    { label: 'MONO', value: 'MONO' },
    { label: 'PURE AUDIO', value: 'PURE AUDIO' },
    { label: 'FULL MONO', value: 'FULL MONO' },
    { label: 'Multi Zone Music', value: 'Multi Zone Music' },
    { label: 'Straight Decode', value: 'Straight Decode' },
    { label: 'DOLBY ATMOS', value: 'DOLBY ATMOS' },
    { label: 'PLII Music', value: 'PLII Music' },
    { label: 'DTS:X/Neural:X', value: 'DTS:X/Neural:X' },
    { label: 'Neo:6 Music', value: 'Neo:6 Music' },
    { label: 'PLII Game', value: 'PLII Game' },
    { label: 'Auto Surround', value: 'Auto Surround' },
  ])

  const [attributeOptions, setAttributeOptions] = useState([
    { label: 'switch', value: 'switch' },
    { label: 'mute', value: 'mute' },
    { label: 'inputSource', value: 'inputSource' },
    { label: 'volume', value: 'volume' },
    { label: 'volumedB', value: 'volumedB' },
    { label: 'surroundMode', value: 'surroundMode' },
  ])

  const [propertiesOptions, setPropertiesOptions] = useState([
    { label: 'value', value: 'value' },
    { label: 'unit', value: 'unit' },
    { label: 'supported', value: 'supported' },
  ])

  const [stringPropertyEnumOptions, setStringPropertyEnumOptions] = useState([
    { label: 'on', value: 'on' },
    { label: 'off', value: 'off' },
    { label: 'muted', value: 'muted' },
    { label: 'unmuted', value: 'unmuted' },
    { label: '%', value: '%' },
  ])

  const onCreateNewType = created => {
    setTypeOptions([...typeOptions, { label: created, value: created }])
  }

  const onCreateNewCapability = created => {
    setCapabilityOptions([...capabilityOptions, { label: created, value: created }])
  }

  const onCreateNewComponent = created => {
    setComponentOptions([...componentOptions, { label: created, value: created }])
  }

  const onCreateNewCommand = created => {
    setCommandsOptions([...commandsOptions, { label: created, value: created }])
  }

  const onCreateNewStringArgumentEnumOption = created => {
    setStringArgumentEnumOptions([...stringArgumentEnumOptions, { label: created, value: created }])
  }

  const onCreateNewList = created => {
    setListsOptions([...listsOptions, { label: created, value: created }])
  }

  const onCreateNewListItem = created => {
    setListItemOptions([...listItemOptions, { label: created, value: created }])
  }

  const onCreateNewAttribute = created => {
    setAttributeOptions([...attributeOptions, { label: created, value: created }])
  }

  const onCreateNewProperty = created => {
    setPropertiesOptions([...propertiesOptions, { label: created, value: created }])
  }

  const componentNames = get('components', formik.values) || []

  const supportedCapabilities = Object.entries(formik.values.supportedCapabilities || {})

  return (
    <DeviceDefinitionContext.Provider value={{ formik }}>
      <div className='App container-fluid'>
        <div className='row'>
          <div className='col-sm'>
            <form onSubmit={formik.handleSubmit}>
              <div className='row'>
                <div className='col-sm'>
                  <SimpleField fieldName='id' label='Device Definition ID' />
                </div>
                <div className='col-sm-6'>
                  <SimpleField fieldName='name' label='Device Definition Name' />
                </div>
                <div className='col-sm-6'>
                  <SimpleField fieldName='friendlyName' label='Friendly Name' />
                </div>
                <div className='col-sm-6'>
                  <SimpleField fieldName='location' label='Location' />
                </div>
                <div className='col-sm-6'>
                  <SelectField fieldName='type' options={typeOptions} label='Type' onCreateOption={onCreateNewType} />
                </div>
                <div className='col-sm-6'>
                  <SelectField
                    fieldName='components'
                    options={componentOptions}
                    label='Components'
                    onCreateOption={onCreateNewComponent}
                  />
                </div>
              </div>

              {componentNames.map(componentName => (
                <SelectField
                  fieldName={`supportedCapabilities.${componentName}`}
                  options={capabilityOptions}
                  label={`${componentName} capabilities`}
                  onCreateOption={onCreateNewCapability}
                />
              ))}

              {supportedCapabilities.map(([componentName, capabilities]) => (
                <div className='border p-3'>
                  {capabilities.map(capabilityName => {
                    const capabilityPath = `${componentName}.${capabilityName}`

                    const attributeNames = get(`${capabilityPath}.attributeNames`, formik.values) || []
                    const commandNames = get(`${capabilityPath}.commandNames`, formik.values) || []
                    const listsNames = get(`${capabilityPath}.listsNames`, formik.values) || []

                    return (
                      <div className='p-2 m-2 border'>
                        <h3>
                          {componentName} component, {capabilityName} capability:
                        </h3>

                        <div className='row'>
                          <div className='col-sm-6'>
                            <SimpleField fieldName={`${capabilityPath}.id`} label={`ID:`} />
                          </div>
                          <div className='col-sm-6'>
                            <SimpleField fieldName={`${capabilityPath}.version`} label={`Version:`} type='number' />
                          </div>
                          <div className='col-sm-6'>
                            <SimpleField fieldName={`${capabilityPath}.name`} label={`Name:`} />
                          </div>
                          <div className='col-sm-6'>
                            <SimpleField fieldName={`${capabilityPath}.status`} label={`Status:`} />
                          </div>
                        </div>

                        <div className='border p-2 m-2'>
                          <h4>Lists:</h4>
                          <SelectField
                            options={listsOptions}
                            fieldName={`${capabilityPath}.listsNames`}
                            onCreateOption={onCreateNewList}
                          />
                          {listsNames.map(listName => {
                            return (
                              <SelectField
                                label={`${listName} list:`}
                                options={listItemOptions}
                                fieldName={`${capabilityPath}.lists.${listName}`}
                                onCreateOption={onCreateNewListItem}
                              />
                            )
                          })}
                        </div>

                        <div className='border p-2 m-2'>
                          <h4>Commands:</h4>
                          <SelectField
                            options={commandsOptions}
                            fieldName={`${capabilityPath}.commandNames`}
                            onCreateOption={onCreateNewCommand}
                          />
                          {commandNames.map(commandName => {
                            const capabilityCommandPath = `${capabilityPath}.commands.${commandName}`
                            const commandArguments = get(`${capabilityCommandPath}.arguments`, formik.values) || []
                            const argumentNames = commandArguments.map(a => a.name)
                            return (
                              <div className='m-2 p-2 border'>
                                <SelectField
                                  options={argumentNames.map(a => ({ label: a, value: a }))}
                                  fieldName={`${capabilityCommandPath}.argumentNames`}
                                  label={`${commandName} arguments`}
                                  onCreateOption={created => {
                                    formik.setFieldValue(`${capabilityCommandPath}.argumentNames`, [
                                      ...argumentNames,
                                      created,
                                    ])
                                    formik.setFieldValue(`${capabilityCommandPath}.arguments`, [
                                      ...commandArguments,
                                      { name: created },
                                    ])
                                  }}
                                />

                                {commandArguments.map((argument, idx) => {
                                  const argumentPath = `${capabilityCommandPath}.arguments.${idx}`
                                  const argumentType = get(`${argumentPath}.schema.type`, formik.values)
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
                                          <SimpleField
                                            fieldName={`${argumentPath}.schema.minimum`}
                                            label='Minimum'
                                            type='number'
                                          />
                                          <SimpleField
                                            fieldName={`${argumentPath}.schema.maximum`}
                                            label='Maximum'
                                            type='number'
                                          />
                                        </>
                                      )) ||
                                        (argumentType === 'string' && (
                                          <>
                                            {!!listsNames.length && (
                                              <SelectField
                                                isMulti={false}
                                                fieldName={`${argumentPath}.schema.list`}
                                                label='List'
                                                options={listsNames.map(l => ({ label: l, value: l }))}
                                              />
                                            )}
                                            <SelectField
                                              fieldName={`${argumentPath}.schema.enum`}
                                              options={stringArgumentEnumOptions}
                                              label='Enum'
                                              onCreateOption={onCreateNewStringArgumentEnumOption}
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
                                })}
                              </div>
                            )
                          })}
                        </div>

                        <div className='border p-2 m-2'>
                          <h4>Attributes:</h4>
                          <SelectField
                            options={attributeOptions}
                            fieldName={`${capabilityPath}.attributeNames`}
                            onCreateOption={onCreateNewAttribute}
                          />
                          {attributeNames.map(attributeName => {
                            const currentAttributeSchemaPath = `${capabilityPath}.attributes.${attributeName}.schema`
                            const propertyNames =
                              get(`${currentAttributeSchemaPath}.propertyNames`, formik.values) || []

                            return (
                              <div className='border m-2 p-2'>
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
                                  options={propertiesOptions}
                                  onCreateOption={onCreateNewProperty}
                                />
                                <SelectField
                                  fieldName={`${currentAttributeSchemaPath}.required`}
                                  label='Required Properties'
                                  options={propertyNames.map(p => ({ label: p, value: p }))}
                                />
                                {propertyNames.map(propertyName => {
                                  const propertyPath = `${currentAttributeSchemaPath}.properties.${propertyName}`
                                  const propertyType = get(`${propertyPath}.type`, formik.values)
                                  return (
                                    <div className='m-2 p-2 border'>
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
                                            options={stringPropertyEnumOptions}
                                          />
                                          {!!listsNames.length && (
                                            <SelectField
                                              isMulti={false}
                                              fieldName={`${propertyPath}.list`}
                                              label='List'
                                              options={listsNames.map(l => ({ label: l, value: l }))}
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
                      </div>
                    )
                  })}
                </div>
              ))}
            </form>
          </div>
          <div className='col-sm'>
            <ReactJson src={formik.values} />
          </div>
        </div>
      </div>
    </DeviceDefinitionContext.Provider>
  )
}

export default App
