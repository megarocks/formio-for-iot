import React from 'react'
import SimpleField from './components/SimpleField'
import SelectField from './components/SelectField'
import { Tab, Tabs } from 'react-bootstrap'
import ComponentTab from './ComponentTab'
import { get } from 'lodash/fp'
import { Context } from './App'
import useSelectorOptions from './useSelectorOptions'

// component consumes parent context to get access to form management logic
// also it uses custom hook to get access to various selector options and
// functions to call when new created

const DeviceDefinitionForm = () => {
  // consume context
  const context = React.useContext(Context)
  const { formik, showLocationField } = context

  const {
    types,
    createNewType,
    components,
    createNewComponent,
    supportedModels,
    createNewSupportedModel,
  } = useSelectorOptions()

  const componentNames = get('components', formik.values) || []

  return (
    <form onSubmit={formik.handleSubmit} className='mt-3'>
      <div className='row'>
        <div className='col-sm-6'>
          <SimpleField fieldName='name' label='Device Definition Name' />
        </div>
        <div className='col-sm-6'>
          <SimpleField fieldName='id' label='Device Definition ID' />
        </div>
        <div className='col-sm-6'>
          <SimpleField fieldName='friendlyName' label='Friendly Name' />
        </div>
        {showLocationField && (
          <div className='col-sm-6'>
            <SimpleField fieldName='location' label='Location' />
          </div>
        )}
        <div className='col-sm-6'>
          <SelectField
            fieldName='type'
            options={types}
            label='Type'
            onCreateOption={createNewType}
          />
        </div>
        <div className='col-sm-6'>
          <SelectField
            fieldName='components'
            options={components}
            label='Components'
            onCreateOption={createNewComponent}
          />
        </div>
        <div className='col-sm-6'>
          <SelectField
            fieldName='supportedModels'
            options={supportedModels}
            label='Supported models'
            onCreateOption={createNewSupportedModel}
          />
        </div>
      </div>

      <Tabs defaultActiveKey={componentNames[0]} id='components-tabs' unmountOnExit>
        {componentNames.map((componentName) => (
          <Tab title={componentName} key={componentName} eventKey={componentName}>
            <ComponentTab
              componentName={componentName}
              componentCapabilities={get(
                ['values', 'supportedCapabilities', componentName],
                formik
              )}
            />
          </Tab>
        ))}
      </Tabs>

      <div className='d-flex justify-content-end m-3'>
        <input type='submit' className='btn btn-success btn-lg' />
      </div>
    </form>
  )
}

export default DeviceDefinitionForm
