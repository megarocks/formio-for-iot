import React, { useState } from 'react'
import { useFormik } from 'formik'
import { get } from 'lodash/fp'

import SimpleField from './components/SimpleField'
import SelectField from './components/SelectField'

export const DeviceDefinitionContext = React.createContext()

// TODO Questions:
// commands.arguments.schema.list only when string?
// commands.arguments.schema.title not every time. ok?
// commands.arguments.schema.type.object than what?

function App() {
  const formik = useFormik({
    initialValues: {
      id: 'test',
      name: 'test',
      type: ['Receiver'],
      friendlyName: 'test',
      components: ['main'],
      location: 'test',
      supportedCapabilities: {
        main: ['audioMute'],
      },
      main: {
        audioMute: {
          id: 'test',
          version: 7,
          name: 'test',
          status: 'test',
          commandNames: ['setMute'],
          commands: {
            setMute: {
              arguments: [
                {
                  name: 'test',
                  required: true,
                  schema: {
                    type: 'string',
                    enum: ['muted', 'unmuted'],
                  },
                },
              ],
            },
          },
        },
      },
    },
    onSubmit: values => {
      console.log(values)
    },
  })

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

  //
  const [commandsOptions, setCommandsOptions] = useState([
    { label: 'setMute', value: 'setMute' },
    { label: 'mute', value: 'setMute' },
    { label: 'unmute', value: 'unmute' },
  ])

  const [stringArgumentEnumOptions, setStringArgumentEnumOptions] = useState([
    { label: 'muted', value: 'muted' },
    { label: 'unmuted', value: 'unmuted' },
  ])

  const [listsOptions, setListsOptions] = useState([{ label: 'inputs', value: 'inputs' }])

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

  return (
    <DeviceDefinitionContext.Provider value={{ formik }}>
      <div className='App container'>
        <form onSubmit={formik.handleSubmit}>
          <SimpleField fieldName='id' label='Device Definition ID' />
          <SimpleField fieldName='name' label='Device Definition Name' />
          <SimpleField fieldName='friendlyName' label='Friendly Name' />
          <SelectField fieldName='type' options={typeOptions} label='Type' onCreateOption={onCreateNewType} />
          <SelectField
            fieldName='components'
            options={componentOptions}
            label='Components'
            onCreateOption={onCreateNewComponent}
          />
          {(get('values.components', formik) || []).map(component => (
            <SelectField
              fieldName={`supportedCapabilities.${component}`}
              options={capabilityOptions}
              label={`${component} capabilities`}
              onCreateOption={onCreateNewCapability}
            />
          ))}

          {Object.entries(formik.values.supportedCapabilities || {}).map(([component, capabilities]) => (
            <div className='border p-3'>
              {capabilities.map(capability => {
                const fieldNamePrefix = `${component}.${capability}`

                const commandNames = get(`values.${fieldNamePrefix}.commandNames`, formik) || []
                const listsNames = get(`values.${fieldNamePrefix}.listsNames`, formik) || []

                const addNewArgument = command => () => {
                  const currentArguments = get(`values.${fieldNamePrefix}.commands.${command}.arguments`, formik) || []
                  formik.setFieldValue(`${fieldNamePrefix}.commands.${command}.arguments`, [...currentArguments, {}])
                }

                return (
                  <div className='p-2 m-2 border'>
                    <h3>
                      {component} component, {capability} capability:
                    </h3>
                    <SimpleField fieldName={`${fieldNamePrefix}.id`} label={`${component} - ${capability} ID:`} />
                    <SimpleField
                      fieldName={`${fieldNamePrefix}.version`}
                      label={`${component} - ${capability} Version:`}
                      type='number'
                    />
                    <SimpleField fieldName={`${fieldNamePrefix}.name`} label={`${component} - ${capability} Name:`} />
                    <SimpleField
                      fieldName={`${fieldNamePrefix}.status`}
                      label={`${component} - ${capability} Status:`}
                    />

                    <h4>Lists:</h4>
                    <SelectField
                      options={listsOptions}
                      fieldName={`${fieldNamePrefix}.listsNames`}
                      onCreateOption={onCreateNewList}
                    />
                    {listsNames.map(listName => {
                      return (
                        <SelectField
                          label={`${listName} list:`}
                          options={listItemOptions}
                          fieldName={`${fieldNamePrefix}.lists.${listName}`}
                          onCreateOption={onCreateNewListItem}
                        />
                      )
                    })}

                    <h4>Commands:</h4>
                    <SelectField
                      options={commandsOptions}
                      fieldName={`${fieldNamePrefix}.commandNames`}
                      onCreateOption={onCreateNewCommand}
                    />
                    {commandNames.map(command => {
                      return (
                        <div className='m-2 p-2 border'>
                          <h5>{command} Arguments:</h5>
                          {(get(`values.${fieldNamePrefix}.commands.${command}.arguments`, formik) || []).map(
                            (argument, idx) => {
                              return (
                                <div className='p-2 m-2 border'>
                                  <SimpleField
                                    fieldName={`${fieldNamePrefix}.commands.${command}.arguments.${idx}.name`}
                                    label='Argument Name:'
                                  />
                                  <SimpleField
                                    fieldName={`${fieldNamePrefix}.commands.${command}.arguments.${idx}.required`}
                                    type='checkbox'
                                    inputProps={{
                                      checked: get(
                                        `values.${fieldNamePrefix}.commands.${command}.arguments.${idx}.required`,
                                        formik,
                                      ),
                                    }}
                                    label='Required'
                                  />
                                  <SelectField
                                    isMulti={false}
                                    fieldName={`${fieldNamePrefix}.commands.${command}.arguments.${idx}.schema.type`}
                                    label='Schema Type'
                                    options={[
                                      { label: 'string', value: 'string' },
                                      { label: 'integer', value: 'integer' },
                                      { label: 'object', value: 'object' },
                                    ]}
                                  />
                                  <SimpleField
                                    fieldName={`${fieldNamePrefix}.commands.${command}.arguments.${idx}.schema.title`}
                                    label='Schema Title'
                                  />
                                  <SimpleField
                                    fieldName={`${fieldNamePrefix}.commands.${command}.arguments.${idx}.schema.list`}
                                    label='Schema List'
                                  />
                                  {(get(
                                    `values.${fieldNamePrefix}.commands.${command}.arguments.${idx}.schema.type`,
                                    formik,
                                  ) === 'integer' && (
                                    <>
                                      <SimpleField
                                        fieldName={`${fieldNamePrefix}.commands.${command}.arguments.${idx}.schema.minimum`}
                                        label='Minimum'
                                        type='number'
                                      />
                                      <SimpleField
                                        fieldName={`${fieldNamePrefix}.commands.${command}.arguments.${idx}.schema.maximum`}
                                        label='Maximum'
                                        type='number'
                                      />
                                      <SimpleField
                                        fieldName={`${fieldNamePrefix}.commands.${command}.arguments.${idx}.schema.default`}
                                        label='Default'
                                        type='number'
                                      />
                                    </>
                                  )) ||
                                    (get(
                                      `values.${fieldNamePrefix}.commands.${command}.arguments.${idx}.schema.type`,
                                      formik,
                                    ) === 'string' && (
                                      <SelectField
                                        fieldName={`${fieldNamePrefix}.commands.${command}.arguments.${idx}.schema.enum`}
                                        options={stringArgumentEnumOptions}
                                        label='Enum'
                                        onCreateOption={onCreateNewStringArgumentEnumOption}
                                      />
                                    ))}
                                </div>
                              )
                            },
                          )}
                          <button className='btn btn-primary' onClick={addNewArgument(command)}>
                            Add Argument
                          </button>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ))}
        </form>
        <pre>{JSON.stringify(formik.values, null, 2)}</pre>
      </div>
    </DeviceDefinitionContext.Provider>
  )
}

export default App
