import { useEffect } from 'react'
import { toast } from 'react-toastify'

import useApiResource from './useApiResource'
import { createOption } from './utils'

export default () => {
  const componentsResourceOptions = useResourceOptions('components')
  const typesResourceOptions = useResourceOptions('types')
  const capabilitiesResourceOptions = useResourceOptions('capabilities')
  const attributesResourceOptions = useResourceOptions('attributes')
  const propertiesResourceOptions = useResourceOptions('properties')
  const listsResourceOptions = useResourceOptions('lists')
  const listItemsResourceOptions = useResourceOptions('listItems')
  const commandsResourceOptions = useResourceOptions('commands')
  const enumsResourceOptions = useResourceOptions('enums')
  const supportedModelsResourceOptions = useResourceOptions('supported_models')
  const capabilityTagsResourceOptions = useResourceOptions('capability-tags')

  return {
    enumOptions: enumsResourceOptions.options,
    createEnumOption: enumsResourceOptions.createNew,
    commandsOptions: commandsResourceOptions.options,
    createNewCommand: commandsResourceOptions.createNew,
    lists: listsResourceOptions.options,
    createNewList: listsResourceOptions.createNew,
    listItems: listItemsResourceOptions.options,
    createNewListItem: listItemsResourceOptions.createNew,
    properties: propertiesResourceOptions.options,
    createNewProperty: propertiesResourceOptions.createNew,
    attributes: attributesResourceOptions.options,
    createNewAttribute: attributesResourceOptions.createNew,
    types: typesResourceOptions.options,
    createNewType: typesResourceOptions.createNew,
    capabilities: capabilitiesResourceOptions.options,
    createNewCapability: capabilitiesResourceOptions.createNew,
    components: componentsResourceOptions.options,
    createNewComponent: componentsResourceOptions.createNew,

    supportedModels: supportedModelsResourceOptions.options,
    createNewSupportedModel: supportedModelsResourceOptions.createNew,

    tags: capabilityTagsResourceOptions.options,
    createNewTag: capabilityTagsResourceOptions.createNew,
  }
}

function useResourceOptions(resource) {
  const apiResource = useApiResource(resource)
  const { data = [], create, fetch } = apiResource
  const options = data.map(({ id }) => createOption(id))
  const createNew = async (created) => {
    try {
      await create({ id: created })
      await fetch()
      toast.success(`${resource}: ${created} was created`)
    } catch (e) {
      toast.error(`Error while creating ${resource} ${created}`)
      toast.error(e.message)
    }
  }
  useEffect(() => {
    fetch()
    // eslint-disable-next-line
  }, [])

  return {
    options,
    createNew,
  }
}
