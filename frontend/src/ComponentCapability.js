import React from 'react'
import { get } from 'lodash/fp'
import { Tab, Tabs } from 'react-bootstrap'

import SimpleField from './components/SimpleField'
import CommandsInputs from './CommandsInputs'
import ListsInputs from './ListsInputs'
import AttributesInputs from './AttributesInputs'
import { DeviceDefinitionContext } from './App'

const ComponentCapability = ({ componentName, capabilityName }) => {
  const context = React.useContext(DeviceDefinitionContext)
  const formik = context.formik

  const capabilityPath = `${componentName}.${capabilityName}`

  const attributeNames = get(`${capabilityPath}.attributeNames`, formik.values) || []
  const listsNames = get(`${capabilityPath}.listsNames`, formik.values) || []

  return (
    <div className='px-2 border' key={`${componentName}.${capabilityName}`}>
      <h3>
        {componentName} component, {capabilityName} capability:
      </h3>

      <Tabs defaultActiveKey='main' id='component-capability-features' unmountOnExit>
        <Tab title='Main' eventKey='main'>
          <div className='row'>
            <div className='col-sm-6'>
              <SimpleField fieldName={`${capabilityPath}.id`} label={`ID:`} />
            </div>
            <div className='col-sm-6'>
              <SimpleField
                fieldName={`${capabilityPath}.version`}
                label={`Version:`}
                type='number'
              />
            </div>
            <div className='col-sm-6'>
              <SimpleField fieldName={`${capabilityPath}.name`} label={`Name:`} />
            </div>
            <div className='col-sm-6'>
              <SimpleField fieldName={`${capabilityPath}.status`} label={`Status:`} />
            </div>
          </div>
        </Tab>
        <Tab title='Commands' eventKey='commands'>
          <CommandsInputs capabilityPath={capabilityPath} />
        </Tab>
        <Tab title='Lists' eventKey='lists'>
          <ListsInputs capabilityPath={capabilityPath} />
        </Tab>
        <Tab title='Attributes' eventKey='attributes'>
          <AttributesInputs
            listsNames={listsNames}
            capabilityPath={capabilityPath}
            attributeNames={attributeNames}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ComponentCapability
