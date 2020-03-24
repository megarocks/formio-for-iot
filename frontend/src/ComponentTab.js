import React from 'react'
import SelectField from './components/SelectField'
import useSelectorOptions from './useSelectorOptions'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import ComponentCapability from './ComponentCapability'

const ComponentTab = ({ componentName, componentCapabilities = [] }) => {
  const { capabilities, createNewCapability } = useSelectorOptions()

  return (
    <div>
      <SelectField
        key={`supportedCapabilities.${componentName}`}
        fieldName={`supportedCapabilities.${componentName}`}
        options={capabilities}
        label='Capabilities'
        onCreateOption={createNewCapability}
      />

      <Tab.Container id='component-capabilities' defaultActiveKey={componentCapabilities[0] || ''} unmountOnExit>
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
                  <ComponentCapability componentName={componentName} capabilityName={capability} />
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
