import React, { useEffect, useMemo, useState } from 'react'
import useApiResource from './useApiResource'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { Context } from './App'
import { Container, Tab, Tabs, Alert } from 'react-bootstrap'
import InitialDefinitionSelector from './InitialDefinitionSelector'
import DeviceDefinitionForm from './DeviceDefinitionForm'
import ReactJson from 'react-json-view'
import { max } from 'lodash/fp'

const LocalizationScreen = () => {
  const { data: deviceLibrary = [], fetch: fetchTemplates } = useApiResource('device_library')
  const {
    data: localizedDevices = [],
    fetch: fetchLocalized,
    create: createLocalized,
    update: updateLocalized,
  } = useApiResource('username_devices')

  const templateSelectorOptions = useMemo(
    () => [...deviceLibrary, ...localizedDevices],
    // eslint-disable-next-line
    [JSON.stringify(deviceLibrary), JSON.stringify(localizedDevices)]
  )

  const [initialValues, setInitialValues] = useState()

  useEffect(() => {
    fetchTemplates()
    fetchLocalized()
    // eslint-disable-next-line
  }, [])

  const formik = useFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
  })

  const isUpdate = localizedDevices.find((d) => d.id === formik.values?.id)

  async function onSubmit(values) {
    try {
      if (isUpdate) {
        await updateLocalized(values)
      } else {
        await createLocalized(values)
      }
      await fetchLocalized()
      toast.success(`Localization #${values.id} ${isUpdate ? 'updated' : 'created'}`)
    } catch (e) {
      toast.error(e.message)
    }
  }

  useEffect(() => {
    if (initialValues) {
      const currentId = initialValues.id
      let newId = currentId
      const idParts = currentId.split('_')
      const lastPart = idParts[idParts.length - 1]
      const isLastPartNumber = Number.isInteger(Number(lastPart))
      if (!isLastPartNumber) {
        function getCounterForCurrentId() {
          const numbers = localizedDevices
            .filter((t) => t.id.startsWith(initialValues.id))
            .map((t) => {
              const currentId = t.id
              const idParts = currentId.split('_')
              const lastPart = idParts[idParts.length - 1]
              const number = Number(lastPart)
              const isLastPartNumber = Number.isInteger(number)
              if (isLastPartNumber) return number
              else return 0
            })
          return max(numbers) || 0
        }
        idParts.push(String(getCounterForCurrentId() + 1).padStart(2, '0'))
        newId = idParts.join('_')
        setInitialValues({
          ...initialValues,
          id: newId,
        })
      }
    }
    // eslint-disable-next-line
  }, [JSON.stringify(initialValues)])

  return (
    <>
      <Context.Provider value={{ formik, showDisplayMaps: true, showLocationField: true }}>
        <Container fluid>
          <InitialDefinitionSelector
            value={initialValues?.id}
            setInitialValues={setInitialValues}
            definitions={templateSelectorOptions}
            label='Select device definition'
          />

          {initialValues ? (
            <Tabs defaultActiveKey='form' id='form-json-tabs' unmountOnExit>
              <Tab title='Form' eventKey='form'>
                <DeviceDefinitionForm />
              </Tab>
              <Tab title='JSON' eventKey='json'>
                <ReactJson src={formik.values} collapsed />
              </Tab>
            </Tabs>
          ) : (
            <Alert variant='info'>Select device definition to display form</Alert>
          )}
        </Container>
      </Context.Provider>
    </>
  )
}

export default LocalizationScreen
