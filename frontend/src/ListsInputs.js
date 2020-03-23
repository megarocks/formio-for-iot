import React from 'react'

import SelectField from './components/SelectField'
import useSelectorOptions from './useSelectorOptions'

const ListsInputs = ({ listsNames = [], capabilityPath }) => {
  const { lists, createNewList, listItems, createNewListItem } = useSelectorOptions()
  return (
    <div className='border p-2 m-2'>
      <h4>Lists:</h4>
      <SelectField options={lists} fieldName={`${capabilityPath}.listsNames`} onCreateOption={createNewList} />
      {listsNames.map(listName => {
        return (
          <SelectField
            key={`${capabilityPath}.lists.${listName}`}
            label={`${listName} list:`}
            options={listItems}
            fieldName={`${capabilityPath}.lists.${listName}`}
            onCreateOption={createNewListItem}
          />
        )
      })}
    </div>
  )
}

export default ListsInputs
