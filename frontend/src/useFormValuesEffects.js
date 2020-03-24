import { useEffect } from 'react'
import { get, pick, set } from 'lodash/fp'

const defaultRootFields = [
  'id',
  'name',
  'type',
  'friendlyName',
  'components',
  'supportedCapabilities',
  'location',
]
export default ({ values, setValues, initialValues }) => {
  const valuesAsString = JSON.stringify(values)
  useEffect(() => {
    let newValues = { ...values }
    newValues = withOnlySelectedComponents(values)
    newValues = withOnlySelectedCapabilities(values)
    // newValues = withOnlySelectedCommands(values)
    setValues(newValues)
    // eslint-disable-next-line
  }, [valuesAsString, setValues])

  useEffect(() => {
    setValues(withHelperFields(initialValues))
    // eslint-disable-next-line
  }, [initialValues])
}

function withOnlySelectedComponents(values) {
  const currentComponents = values.components || []
  const withOnlySelectedComponentsAtCapabilities = {
    ...values,
    supportedCapabilities: pick(
      currentComponents,
      values.supportedCapabilities || {}
    ),
  }
  return pick(
    [...defaultRootFields, ...currentComponents],
    withOnlySelectedComponentsAtCapabilities
  )
}
function withOnlySelectedCapabilities(values) {
  const newValues = { ...values }
  const { components = [] } = newValues
  components.forEach((component) => {
    newValues[component] = pick(
      newValues.supportedCapabilities[component],
      newValues[component]
    )
  })
  return newValues
}
function withOnlySelectedCommands(values) {
  let newValues = { ...values }
  const { components = [] } = newValues
  components.forEach((component) => {
    const capabilitiesMap = newValues[component] || {}
    Object.keys(capabilitiesMap).forEach((capabilityName) => {
      const capability = get([component, capabilityName], newValues)
      const onlySelectedAttributesOfCurrentCapability = pick(
        capability.commandNames,
        capability
      )
      newValues = set(
        onlySelectedAttributesOfCurrentCapability,
        [component, capabilityName],
        newValues
      )
    })
  })
  return newValues
}

function withHelperFields(values) {
  let newValues = { ...values }
  if (!newValues.components) newValues.components = []

  newValues.components.forEach(addHelperFieldsToComponent)

  function addHelperFieldsToComponent(component) {
    const componentCapabilities = pick(
      newValues.supportedCapabilities[component],
      newValues[component]
    )
    Object.keys(componentCapabilities).forEach(addHelperFieldsToCapability)

    function addHelperFieldsToCapability(capabilityName) {
      const capability = get([component, capabilityName], newValues)

      const commandNames = Object.keys(capability.commands || {})
      const listsNames = Object.keys(capability.lists || {})
      const attributeNames = Object.keys(capability.attributes || {})

      attributeNames.forEach(addHelperFieldsToAttribute)
      newValues = set(
        [component, capabilityName, 'commandNames'],
        commandNames,
        newValues
      )
      newValues = set(
        [component, capabilityName, 'attributeNames'],
        attributeNames,
        newValues
      )
      newValues = set(
        [component, capabilityName, 'listsNames'],
        listsNames,
        newValues
      )

      function addHelperFieldsToAttribute(attribute) {
        const properties = get(
          ['attributes', attribute, 'schema', 'properties'],
          capability
        )
        const propertyNames = Object.keys(properties)
        newValues = set(
          [
            component,
            capabilityName,
            'attributes',
            attribute,
            'schema',
            'propertyNames',
          ],
          propertyNames,
          newValues
        )
      }
    }
  }
  return newValues
}
