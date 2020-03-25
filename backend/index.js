const express = require('express')
const cors = require('cors')
const initDb = require('./db')

const { createRouter, resources } = require('./createResourceRouter')
initDb.then((db) => {
  const app = express()

  app.use(cors())
  app.use(express.json())

  for (const resourceName of resources) {
    app.use(`/api/${resourceName}`, createRouter({ db, resourceName }))
  }

  app.listen(3001, () => {
    console.log('server is listening at :3001')
  })
})
