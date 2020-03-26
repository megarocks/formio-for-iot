const express = require('express')
const cors = require('cors')

const resources = [
  'device_library',
  'localized_devices',
  'components',
  'types',
  'capabilities',
  'attributes',
  'properties',
  'lists',
  'listItems',
  'commands',
  'enums',
]

const createRouter = require('./createResourceRouter')

async function init() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  for (const resourceName of resources) {
    app.use(`/api/${resourceName}`, await createRouter({ resourceName }))
  }

  return app
}

init().then((app) => {
  app.listen(3001, () => {
    console.log('server is listening at :3001')
  })
})
