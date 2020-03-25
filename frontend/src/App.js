import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Tabs, Tab, Container } from 'react-bootstrap'
import ReactJson from 'react-json-view'

import DeviceDefinitionForm from './DeviceDefinitionForm'
import InitialDefinitionSelector from './InitialDefinitionSelector'
import useApiResource from './useApiResource'

export const DeviceDefinitionContext = React.createContext()

function App() {
  const { data: definitions = [], fetch, save } = useApiResource('definitions')

  const [initialValues, setInitialValues] = useState()

  useEffect(() => {
    fetch()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (definitions?.length) {
      setInitialValues(definitions[0])
    }
  }, [definitions])

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await save(values)
      await fetch()
    },
    enableReinitialize: true,
  })

  return (
    <DeviceDefinitionContext.Provider value={{ formik }}>
      <Container fluid>
        <InitialDefinitionSelector
          value={initialValues?.id}
          setInitialValues={setInitialValues}
          definitions={definitions}
        />
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
