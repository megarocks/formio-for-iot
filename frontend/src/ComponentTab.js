import React, { useContext, useEffect } from 'react'
import Select from 'react-select'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import CapabilitySubForm from './CapabilitySubForm'
import { createOption } from './utils'
import { Context } from './App'
import useApiResource from './useApiResource'
import { get, set, unset } from 'lodash/fp'

const ComponentTab = ({ componentName, componentCapabilities = [] }) => {
  const context = useContext(Context)
  const formik = context.formik

  const { data: capabilities = [], fetch } = useApiResource('capabilities')

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <div>
        <label>Capabilities:</label>
        <Select
          isMulti
          options={capabilities.map((c) => ({ ...createOption(c.id), ...c }))}
          placeholder='Capabilities'
          value={componentCapabilities.map(createOption)}
          onChange={(currentSelection, { action, option, removedValue }) => {
            //identify what changed
            //when something deleted - remove from supported capabilities and from component
            let newValues = { ...formik.values }
            if (action === 'remove-value') {
              const componentArray = get(['supportedCapabilities', componentName], newValues) || []
              const withoutRemovedCapability = componentArray.filter(
                (cap) => cap !== removedValue.value
              )
              newValues = set(
                ['supportedCapabilities', componentName],
                withoutRemovedCapability,
                newValues
              )
              newValues = unset([componentName, removedValue.value], newValues)
            }
            //when something added - add item to supported capabilities and whole object to component
            if (action === 'select-option') {
              const componentArray = get(['supportedCapabilities', componentName], newValues) || []
              componentArray.push(option.value)
              newValues = set(['supportedCapabilities', componentName], componentArray, newValues)
              // find data for selected capability and inject into form value
              const selectedCapabilityData = capabilities.find((c) => c.id === option.value)
              newValues = set([componentName, option.value], selectedCapabilityData, newValues)
            }
            formik.setValues(newValues)
          }}
          filterOption={({ label, value, data: { tags = [] } = {} }, filterString) => {
            if (
              label.startsWith(filterString) ||
              value.startsWith(filterString) ||
              tags.some((tag) => tag.startsWith(filterString))
            )
              return true
            else return false
          }}
        />
      </div>

      <Tab.Container
        id='component-capabilities'
        defaultActiveKey={componentCapabilities[0] || ''}
        unmountOnExit
      >
        <Row>
          <Col sm={3}>
            <Nav variant='pills' className='flex-column'>
              {componentCapabilities.map((capability) => (
                <Nav.Item key={componentName + capability + 'nav-item'}>
                  <Nav.Link eventKey={capability}>{capability}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {componentCapabilities.map((capability) => (
                <Tab.Pane eventKey={capability} key={componentName + capability + 'tab-pane'}>
                  <CapabilitySubForm componentName={componentName} capabilityName={capability} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default ComponentTab
