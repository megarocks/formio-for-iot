import React, { useCallback, useState } from 'react'
import { useFormik } from 'formik'
import { Tabs, Tab, Container } from 'react-bootstrap'
import ReactJson from 'react-json-view'

import allDefinitions from './examples'
import useFormValuesEffects from './useFormValuesEffects'
import DeviceDefinitionForm from './DeviceDefinitionForm'
import InitialDefinitionSelector from './InitialDefinitionSelector'

export const DeviceDefinitionContext = React.createContext()

// TODO Questions:
// commands.arguments.schema.list only when string?
// commands.arguments.schema.title not every time. ok?
// commands.arguments.schema.type.object than what?

function App() {
  const [initialValues, setInitialValues] = useState(allDefinitions[0])

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      console.log(values)
    },
    enableReinitialize: true,
  })

  const setValues = useCallback(formik.setValues, [])
  useFormValuesEffects({ values: formik.values, setValues })

  return (
    <DeviceDefinitionContext.Provider value={{ formik, allDefinitions }}>
      <Container fluid>
        <InitialDefinitionSelector value={initialValues.id} setInitialValues={setInitialValues} />
        <Tabs defaultActiveKey='form' id='form-json-tabs' unmountOnExit>
          <Tab title='Form' eventKey='form'>
            <DeviceDefinitionForm />
          </Tab>
          <Tab title='JSON' eventKey='json'>
            <ReactJson src={formik.values} collapsed />
          </Tab>
        </Tabs>
      </Container>
    </DeviceDefinitionContext.Provider>
  )
}

export default App
