import { useEffect } from 'react'
import { get, pick, set } from 'lodash/fp'

const defaultRootFields = ['id', 'name', 'type', 'friendlyName', 'components', 'supportedCapabilities', 'location']
export default ({ values, setValues }) => {
  const valuesAsString = JSON.stringify(values)
  useEffect(() => {
    setValues(
      withOnlySelectedCommands(withOnlySelectedCapabilities(withOnlySelectedComponents(withHelperFields(values)))),
    )
    function withOnlySelectedComponents(values) {
      // leave at supportedCapabilities and at root only fields which equal to components array
      const currentComponents = values.components || []
      const withOnlySelectedComponentsAtCapabilities = {
        ...values,
        supportedCapabilities: pick(currentComponents, values.supportedCapabilities || {}),
      }
      const withOnlySupportedComponentsAtRoot = pick(
        [...defaultRootFields, ...currentComponents],
        withOnlySelectedComponentsAtCapabilities,
      )
      return withOnlySupportedComponentsAtRoot
    }
    function withOnlySelectedCapabilities(values) {
      values.components.forEach(component => {
        values[component] = pick(values.supportedCapabilities[component], values[component])
      })
      return { ...values }
    }
    function withOnlySelectedCommands(values) {
      values.components.forEach(component => {
        const capabilitiesMap = values[component]
        Object.keys(capabilitiesMap).forEach(capabilityName => {
          const capability = get([component, capabilityName], values)
          const onlySelectedAttributesOfCurrentCapability = pick(capability.commandNames, capability)
          set(onlySelectedAttributesOfCurrentCapability, [component, capabilityName], values)
        })
      })
      return values
    }
    function withHelperFields(values) {
      if (!values.components) values.components = []
      values.components.forEach(component => {
        const componentCapabilities = pick(values.supportedCapabilities[component], values[component])
        Object.keys(componentCapabilities).forEach(capabilityName => {
          const capability = get([component, capabilityName], values)

          const commandNames = Object.keys(capability.commands || {})
          const attributeNames = Object.keys(capability.attributes || {})
          const listsNames = Object.keys(capability.lists || {})

          attributeNames.forEach(attribute => {
            const properties = get(['attributes', attribute, 'schema', 'properties'], capability)
            const propertyNames = Object.keys(properties)
            values = set(
              [component, capabilityName, 'attributes', attribute, 'schema', 'propertyNames'],
              propertyNames,
              values,
            )
          })

          values = set([component, capabilityName, 'commandNames'], commandNames, values)
          values = set([component, capabilityName, 'attributeNames'], attributeNames, values)
          values = set([component, capabilityName, 'listsNames'], listsNames, values)
        })
      })
      return values
    }
    // eslint-disable-next-line
  }, [valuesAsString, setValues])
}
