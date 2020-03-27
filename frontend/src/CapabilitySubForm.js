import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import SimpleField from './components/SimpleField'
import CommandsInputs from './CommandsInputs'
import ListsInputs from './ListsInputs'
import AttributesInputs from './AttributesInputs'
import DisplayMaps from './DisplayMaps'
import { createFieldPath } from './utils'
import SelectField from './components/SelectField'
import useSelectorOptions from './useSelectorOptions'

const CapabilitySubForm = ({ componentName, capabilityName, tagsInputs }) => {
  const capabilityPath = createFieldPath([componentName, capabilityName])

  const { tags, createNewTag } = useSelectorOptions()

  return (
    <div className='px-2 border' key={capabilityPath}>
      <Tabs defaultActiveKey='main' id='component-capability-features' unmountOnExit>
        <Tab title='Main' eventKey='main'>
          <div className='row'>
            <div className='col-sm-6'>
              <SimpleField fieldName={createFieldPath([capabilityPath, 'id'])} label={`ID:`} />
            </div>
            <div className='col-sm-6'>
              <SimpleField
                fieldName={createFieldPath([capabilityPath, 'version'])}
                label='Version:'
                type='number'
              />
            </div>
            <div className='col-sm-6'>
              <SimpleField fieldName={createFieldPath([capabilityPath, 'name'])} label={`Name:`} />
            </div>
            <div className='col-sm-6'>
              <SimpleField
                fieldName={createFieldPath([capabilityPath, 'status'])}
                label={`Status:`}
              />
            </div>
            {tagsInputs && (
              <div className='col-sm-6'>
                <SelectField
                  fieldName={createFieldPath([capabilityPath, 'tags'])}
                  isMulti
                  label='Tags'
                  placeHolder='Pick up or create tags'
                  options={tags}
                  onCreateOption={createNewTag}
                />
              </div>
            )}
          </div>
        </Tab>
        <Tab title='Commands' eventKey='commands'>
          <CommandsInputs capabilityPath={capabilityPath} />
        </Tab>
        <Tab title='Lists' eventKey='lists'>
          <ListsInputs capabilityPath={capabilityPath} />
        </Tab>
        <Tab title='Attributes' eventKey='attributes'>
          <AttributesInputs capabilityPath={capabilityPath} />
        </Tab>
        <Tab title='Display Maps' eventKey='display-maps'>
          <DisplayMaps capabilityPath={capabilityPath} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default CapabilitySubForm
