import React, { useEffect, useState } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'
import InitialDefinitionSelector from './InitialDefinitionSelector'
import DeviceDefinitionForm from './DeviceDefinitionForm'
import ReactJson from 'react-json-view'
import { toast } from 'react-toastify'
import { Context } from './App'
import useApiResource from './useApiResource'
import { useFormik } from 'formik'
import useFormValuesEffects from './useFormValuesEffects'

const DeviceLibraryScreen = () => {
  const { data: definitions = [], fetch, create, update } = useApiResource('device_library')

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
    onSubmit,
    enableReinitialize: true,
  })

  const isUpdate = definitions.find((d) => d.id === formik.values?.id)

  async function onSubmit(values) {
    try {
      if (isUpdate) {
        await update(values)
      } else {
        await create(values)
      }
      await fetch()
      toast.success(`Definition #${values.id} ${isUpdate ? 'updated' : 'created'}`)
    } catch (e) {
      toast.error(e.message)
    }
  }

  useFormValuesEffects({ initialValues, setValues: formik.setValues, values: formik.values })

  return (
    <>
      <Context.Provider value={{ formik }}>
        <Container fluid>
          <InitialDefinitionSelector
            value={initialValues?.id}
            setInitialValues={setInitialValues}
            definitions={definitions}
          />
          <Tabs defaultActiveKey='form' id='form-json-tabs' unmountOnExit>
            <Tab title='Form' eventKey='form'>
              <DeviceDefinitionForm isForLocalization={false} />
            </Tab>
            <Tab title='JSON' eventKey='json'>
              <ReactJson src={formik.values} collapsed />
            </Tab>
          </Tabs>
        </Container>
      </Context.Provider>
    </>
  )
}

export default DeviceLibraryScreen
