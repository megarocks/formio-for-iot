import React from 'react'

import { Context } from './App'
import { get, max } from 'lodash/fp'
import { createFieldPath, createOnChangeHandler, createOption } from './utils'
import useSelectorOptions from './useSelectorOptions'
import ReactSelect from 'react-select'
import DisplayMapsSortableList from './DisplayMapsSortableList'

const DisplayMaps = ({ capabilityPath }) => {
  const context = React.useContext(Context)
  const formik = context.formik

  const displayMapsPath = createFieldPath([capabilityPath, 'displayMaps'])
  const displayMapsValue = get(displayMapsPath, formik.values) || {}

  const { listItems } = useSelectorOptions()

  const onMapsSelectorChange = createOnChangeHandler({
    fieldPath: displayMapsPath,
    setFieldValue: formik.setFieldValue,
    values: formik.values,
    newValueFactory: () => {
      const highestIndexInCurrentDisplayMap =
        max(Object.entries(displayMapsValue).map(([, { index }]) => index || 0)) || 0
      return { index: highestIndexInCurrentDisplayMap + 1 }
    },
  })

  return (
    <div>
      <label>Select items for mapping</label>
      <ReactSelect
        isMulti
        closeMenuOnSelect
        options={listItems}
        value={Object.keys(displayMapsValue).map(createOption)}
        onChange={onMapsSelectorChange}
      />

      <DisplayMapsSortableList displayMapsPath={displayMapsPath} />
    </div>
  )
}

export default DisplayMaps
