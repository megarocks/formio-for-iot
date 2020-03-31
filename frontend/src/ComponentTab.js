import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import CapabilitySubForm from './CapabilitySubForm'
import { createOption } from './utils'
import { Context } from './App'
import useApiResource from './useApiResource'
import { get, set, unset, intersection } from 'lodash/fp'
import useSelectorOptions from './useSelectorOptions'

const ComponentTab = ({ componentName, componentCapabilities = [] }) => {
  const context = useContext(Context)
  const formik = context.formik

  const { data: capabilities = [], fetch } = useApiResource('capabilities')
  const { tags } = useSelectorOptions()

  useEffect(() => {
    fetch()
    // eslint-disable-next-line
  }, [])

  function onCapabilitySelectorChange(currentSelection, { action, option, removedValue }) {
    //identify what changed
    //when something deleted - remove from supported capabilities and from component
    let newValues = { ...formik.values }
    if (action === 'remove-value') {
      const componentArray = get(['supportedCapabilities', componentName], newValues) || []
      const withoutRemovedCapability = componentArray.filter((cap) => cap !== removedValue.value)
      newValues = set(['supportedCapabilities', componentName], withoutRemovedCapability, newValues)
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
  }

  const [capabilityTagFilter, setCapabilityTagFilter] = useState([])
  const onTagFilterChange = (selected) => {
    setCapabilityTagFilter(selected || [])
  }

  const capabilityOptions = capabilities
    .filter((capability) => {
      if (!capabilityTagFilter.length) return true

      const { tags = [] } = capability
      const filteringTags = capabilityTagFilter.map(({ value }) => value)
      const isPassingFilter = intersection(tags, filteringTags).length > 0
      return isPassingFilter
    })
    .map((c) => createOption(c.id))

  return (
    <div>
      <div className='mt-3'>
        <Row>
          <Col md={3}>
            <label>Filter capabilities by tag:</label>
            <Select
              isMulti
              options={tags}
              placeholder='Select tags to filter capabilities library'
              onChange={onTagFilterChange}
            />
          </Col>
          <Col md={9}>
            <label>Capabilities:</label>
            <Select
              isMulti
              options={capabilityOptions}
              placeholder='Capabilities'
              value={componentCapabilities.map(createOption)}
              onChange={onCapabilitySelectorChange}
            />
          </Col>
        </Row>
      </div>

      <Tab.Container
        id='component-capabilities'
        defaultActiveKey={componentCapabilities[0] || ''}
        unmountOnExit
      >
        <Row className='mt-3'>
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
