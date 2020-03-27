import React, { useEffect, useState } from 'react'
import { Container, Alert } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'
import useApiResource from './useApiResource'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { createOption } from './utils'

import { Context } from './App.js'
import CapabilitySubForm from './CapabilitySubForm'

const CapabilityScreen = () => {
  const [initialValues, setInitialValues] = useState()
  const { fetch, update, create, data: capabilities = [] } = useApiResource('capabilities')

  useEffect(() => {
    fetch()
    // eslint-disable-next-line
  }, [])

  const formik = useFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
  })

  const isUpdate = capabilities.find((c) => c.id === formik.values?.id)

  async function onSubmit(values) {
    try {
      if (isUpdate) {
        await update(values)
      } else {
        await create(values)
      }
      await fetch()
      toast.success(`Capability #${values.id} ${isUpdate ? 'updated' : 'created'}`)
    } catch (e) {
      toast.error(e.message)
    }
  }

  function onChangeCapabilityTemplate(selected) {
    const selectedCapability = capabilities.find((c) => c.id === selected.value)
    setInitialValues(selectedCapability)
  }

  const capabilityOptions = capabilities.map((c) => createOption(c.id))
  const currentOption = capabilityOptions.find((c) => c.value === formik.values?.id)

  async function onCreateOption(created) {
    try {
      const newCapabilityValues = { id: created }
      await create(newCapabilityValues)
      await fetch()
      toast.success('new capability created')
    } catch (e) {
      toast.error(e)
      toast.error('error while creating new capability')
    }
  }

  return (
    <Context.Provider value={{ formik }}>
      <Container fluid>
        <div className='row mt-3'>
          <div className='col-sm'>
            <div className='form-group'>
              <label>Capability Template:</label>
              <CreatableSelect
                options={capabilityOptions}
                placeholder='Select or create capability template'
                value={currentOption}
                onChange={onChangeCapabilityTemplate}
                onCreateOption={onCreateOption}
              />
            </div>
          </div>
        </div>
        {initialValues ? (
          <div className='row'>
            <div className='col-sm'>
              <form onSubmit={formik.handleSubmit}>
                <CapabilitySubForm tagsInputs />
                <div className='d-flex justify-content-end mt-3'>
                  <input type='submit' className='btn btn-lg btn-success' />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <Alert variant='info'>Select capability to see form</Alert>
        )}
      </Container>
    </Context.Provider>
  )
}

export default CapabilityScreen
