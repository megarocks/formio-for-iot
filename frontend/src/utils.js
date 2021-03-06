import { get, pick } from 'lodash/fp'

export const createOption = (item) => ({ label: item, value: item })

export const getOptionLabel = (option) => option?.label
export const getOptionValue = (option) => option?.value

// some selectors share this logic so it is extracted here
// this function creates functions which creates or deletes object keys
// when selector is intended to control object keys (not values)
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

export function createFieldPath(parts = []) {
  const filtered = parts.filter((p) => !!p)
  return filtered.join('.')
}
