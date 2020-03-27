import { get, pick } from 'lodash/fp'

export const createOption = (item) => ({ label: item, value: item })

export const getOptionLabel = (option) => option?.label
export const getOptionValue = (option) => option?.value

export function createOnChangeHandler({
  fieldPath,
  values,
  setFieldValue,
  newValueFactory = () => ({}),
}) {
  return (currentlySelected) => {
    const selectedOptions = (currentlySelected || []).map(getOptionValue)
    let newFieldValue = get(fieldPath, values) || {}
    selectedOptions.forEach((option) => {
      if (!(option in newFieldValue)) newFieldValue[option] = newValueFactory(option)
    })
    newFieldValue = pick(selectedOptions, newFieldValue)
    setFieldValue(fieldPath, newFieldValue)
  }
}
