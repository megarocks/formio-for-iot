import { useCallback, useState } from 'react'

import definitionsArray from './examples'

export default () => {
  const [enumOptions, setEnumOptions] = useState([
    { label: 'muted', value: 'muted' },
    { label: 'unmuted', value: 'unmuted' },
    { label: 'on', value: 'on' },
    { label: 'off', value: 'off' },
    { label: '%', value: '%' },
  ])
  const createEnumOption = useCallback(
    (created) => {
      setEnumOptions([...enumOptions, { label: created, value: created }])
    },
    [enumOptions]
  )

  const [commandsOptions, setCommandsOptions] = useState([
    { label: 'setMute', value: 'setMute' },
    { label: 'mute', value: 'setMute' },
    { label: 'unmute', value: 'unmute' },
    { label: 'setInputSource', value: 'setInputSource' },
    { label: 'getInputSource', value: 'getInputSource' },
    { label: 'setVolumedB', value: 'setVolumedB' },
    { label: 'getVolumedB', value: 'getVolumedB' },
    { label: 'setVolume', value: 'setVolume' },
    { label: 'getVolume', value: 'getVolume' },
    { label: 'volumeUp', value: 'volumeUp' },
    { label: 'volumeDown', value: 'volumeDown' },
    { label: 'on', value: 'on' },
    { label: 'off', value: 'off' },
  ])
  const createNewCommand = useCallback(
    (created) => {
      setCommandsOptions([...commandsOptions, { label: created, value: created }])
    },
    [commandsOptions]
  )

  const [lists, setLists] = useState([
    { label: 'inputs', value: 'inputs' },
    { label: 'modes', value: 'modes' },
  ])
  const createNewList = useCallback(
    (created) => {
      setLists([...lists, { label: created, value: created }])
    },
    [lists]
  )

  const [listItems, setListItems] = useState([
    { label: 'CBL/SAT', value: 'CBL/SAT' },
    { label: 'GAME', value: 'GAME' },
    { label: 'AUX', value: 'AUX' },
    { label: 'BD/DVD', value: 'BD/DVD' },
    { label: 'STRM BOX', value: 'STRM BOX' },
    { label: 'TV', value: 'TV' },
    { label: 'PHONO', value: 'PHONO' },
    { label: 'CD', value: 'CD' },
    { label: 'FM', value: 'FM' },
    { label: 'AM', value: 'AM' },
    { label: 'TUNER', value: 'TUNER' },
    { label: 'USB(Front)', value: 'USB(Front)' },
    { label: 'NET', value: 'NET' },
    { label: 'USB(toggle)', value: 'USB(toggle)' },
    { label: 'BT AUDIO', value: 'BT AUDIO' },
    { label: 'HDMI 5', value: 'HDMI 5' },
    { label: 'HDMI 6', value: 'HDMI 6' },
    { label: 'HDMI 7', value: 'HDMI 7' },

    { label: 'STEREO', value: 'STEREO' },
    { label: 'DIRECT', value: 'DIRECT' },
    { label: 'FILM', value: 'FILM' },
    { label: 'ACTION', value: 'ACTION' },
    { label: 'MUSICAL', value: 'MUSICAL' },
    { label: 'ORCHESTRA', value: 'ORCHESTRA' },
    { label: 'UNPLUGGED', value: 'UNPLUGGED' },
    { label: 'STUDIO-MIX', value: 'STUDIO-MIX' },
    { label: 'TV LOGIC', value: 'TV LOGIC' },
    { label: 'ALL CH STEREO', value: 'ALL CH STEREO' },
    { label: 'THEATER', value: 'THEATER' },
    { label: 'ENHANCED', value: 'ENHANCED' },
    { label: 'MONO', value: 'MONO' },
    { label: 'PURE AUDIO', value: 'PURE AUDIO' },
    { label: 'FULL MONO', value: 'FULL MONO' },
    { label: 'Multi Zone Music', value: 'Multi Zone Music' },
    { label: 'Straight Decode', value: 'Straight Decode' },
    { label: 'DOLBY ATMOS', value: 'DOLBY ATMOS' },
    { label: 'PLII Music', value: 'PLII Music' },
    { label: 'DTS:X/Neural:X', value: 'DTS:X/Neural:X' },
    { label: 'Neo:6 Music', value: 'Neo:6 Music' },
    { label: 'PLII Game', value: 'PLII Game' },
    { label: 'Auto Surround', value: 'Auto Surround' },
  ])
  const createNewListItem = useCallback(
    (created) => {
      setListItems([...listItems, { label: created, value: created }])
    },
    [listItems]
  )

  const [properties, setProperties] = useState([
    { label: 'value', value: 'value' },
    { label: 'unit', value: 'unit' },
    { label: 'supported', value: 'supported' },
  ])
  const createNewProperty = useCallback(
    (created) => {
      setProperties([...properties, { label: created, value: created }])
    },
    [properties]
  )

  const [attributes, setAttributes] = useState([
    { label: 'switch', value: 'switch' },
    { label: 'mute', value: 'mute' },
    { label: 'inputSource', value: 'inputSource' },
    { label: 'volume', value: 'volume' },
    { label: 'volumedB', value: 'volumedB' },
    { label: 'surroundMode', value: 'surroundMode' },
  ])
  const createNewAttribute = useCallback(
    (created) => {
      setAttributes([...attributes, { label: created, value: created }])
    },
    [attributes]
  )

  const [types, setTypes] = useState([
    { label: 'Receiver', value: 'Receiver' },
    { label: 'Media Player', value: 'Media Player' },
  ])
  const createNewType = (created) => {
    setTypes([...types, { label: created, value: created }])
  }

  const [capabilities, setCapabilities] = useState([
    { label: 'switch', value: 'switch' },
    { label: 'audioMute', value: 'audioMute' },
    { label: 'audioVolume', value: 'audioVolume' },
    { label: 'audioVolumedB', value: 'audioVolumedB' },
    { label: 'mediaInputSource', value: 'mediaInputSource' },
    { label: 'surroundMode', value: 'surroundMode' },
  ])
  const createNewCapability = useCallback(
    (created) => {
      setCapabilities([...capabilities, { label: created, value: created }])
    },
    [capabilities]
  )

  const [components, setComponents] = useState([
    { label: 'main', value: 'main' },
    { label: 'zone 2', value: 'zone 2' },
  ])
  const createNewComponent = useCallback(
    (created) => {
      setComponents([...components, { label: created, value: created }])
    },
    [components]
  )

  const [definitions, setDefinitions] = useState(
    definitionsArray.map((d) => ({ label: d.friendlyName, value: d.id }))
  )
  const createNewDefinition = (newDefinition) => {
    const existingIndex = definitions.findIndex(({ value }) => value === newDefinition.id)

    if (existingIndex > -1) {
      definitions[existingIndex] = newDefinition
      setDefinitions(definitions)
    } else {
      setDefinitions([
        ...definitions,
        { label: newDefinition.friendlyName, value: newDefinition.id },
      ])
    }
  }

  return {
    enumOptions,
    createEnumOption,
    commandsOptions,
    createNewCommand,
    lists,
    createNewList,
    listItems,
    createNewListItem,
    properties,
    createNewProperty,
    attributes,
    createNewAttribute,
    types,
    createNewType,
    capabilities,
    createNewCapability,
    components,
    createNewComponent,
    definitions,
  }
}
