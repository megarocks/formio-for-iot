import React from 'react'
import { get } from 'lodash/fp'

import SelectField from './components/SelectField'
import useSelectorOptions from './useSelectorOptions'
import CreatableSelect from 'react-select/creatable'
import { createFieldPath, createOnChangeHandler, createOption } from './utils'
import { Context } from './App'

const ListsInputs = ({ capabilityPath }) => {
  const context = React.useContext(Context)
  const formik = context.formik

  const { lists, createNewList, listItems, createNewListItem } = useSelectorOptions()

  const listsPath = createFieldPath([capabilityPath, 'lists'])

  const listsValue = get(listsPath, formik.values) || {}
  const listsSelectorValue = Object.keys(listsValue).map(createOption)

  const onListsSelectorChange = createOnChangeHandler({
    fieldPath: listsPath,
    setFieldValue: formik.setFieldValue,
    values: formik.values,
  })

  return (
    <div>
      <CreatableSelect
        isMulti
        closeMenuOnSelect
        options={lists}
        onCreateOption={createNewList}
        value={listsSelectorValue}
        onChange={onListsSelectorChange}
      />

      {Object.keys(listsValue).map((listName) => {
        return (
          <SelectField
            key={`${listsPath}.${listName}`}
            label={`${listName} list:`}
            options={listItems}
            fieldName={createFieldPath([listsPath, listName])}
            onCreateOption={createNewListItem}
          />
        )
      })}
    </div>
  )
}

export default ListsInputs
