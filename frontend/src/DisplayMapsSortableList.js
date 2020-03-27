import React from 'react'
import SelectField from './components/SelectField'
import SimpleField from './components/SimpleField'
import { get } from 'lodash/fp'
import { Context } from './App'
import useSelectorOptions from './useSelectorOptions'

const DisplayMapsSortableList = ({ displayMapsPath }) => {
  const context = React.useContext(Context)
  const formik = context.formik

  const { listItems } = useSelectorOptions()

  const displayMapsValue = get(displayMapsPath, formik.values) || {}

  return (
    <ul className='list-group my-2'>
      {Object.entries(displayMapsValue)
        .sort(([, { index: index1 }], [, { index: index2 }]) => index1 - index2)
        .map(([displayMap, mappingInfo]) => (
          <li className='list-group-item' key={'display-maps-' + displayMap}>
            <div className='d-flex'>
              <div>
                <SimpleField
                  fieldName={`${displayMapsPath}.${displayMap}.index`}
                  type='number'
                  placeholder='index'
                />
              </div>
              <div className='d-flex align-items-center mx-2 mt-2'>
                <strong>{displayMap}</strong>&nbsp;maps to ->
              </div>
              <div className='flex-grow-1'>
                <SelectField
                  isMulti={false}
                  options={listItems}
                  fieldName={`${displayMapsPath}.${displayMap}.mapTo`}
                />
              </div>
            </div>
          </li>
        ))}
    </ul>
  )
}

export default DisplayMapsSortableList
