import React from 'react'
import SimpleField from './components/SimpleField'
import SelectField from './components/SelectField'
import { Tab, Tabs } from 'react-bootstrap'
import ComponentTab from './ComponentTab'
import { get } from 'lodash/fp'
import { DeviceDefinitionContext } from './App'
import useSelectorOptions from './useSelectorOptions'

const DeviceDefinitionForm = () => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

  const { types, createNewType, components, createNewComponent } = useSelectorOptions()

  const componentNames = get('components', formik.values) || []

  return (
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
          <SelectField fieldName='type' options={types} label='Type' onCreateOption={createNewType} />
        </div>
        <div className='col-sm-6'>
          <SelectField fieldName='components' options={components} label='Components' onCreateOption={createNewComponent} />
        </div>
      </div>

      <Tabs defaultActiveKey={componentNames[0]} id='components-tabs' unmountOnExit>
        {componentNames.map((componentName) => (
          <Tab title={componentName} key={componentName} eventKey={componentName}>
            <ComponentTab
              componentName={componentName}
              componentCapabilities={get(['values', 'supportedCapabilities', componentName], formik)}
            />
          </Tab>
        ))}
      </Tabs>
    </form>
  )
}

export default DeviceDefinitionForm
