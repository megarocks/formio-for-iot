const express = require('express')

const createCollection = require('./db/createWrapper')

async function createRouter({ resourceName }) {
  const router = express.Router()

  const collection = await createCollection(resourceName)

  router.get('/', async (req, res) => {
    const allItems = await collection.getAll()
    res.json(allItems)
  })
  router.post('/', async (req, res) => {
    const result = await collection.save(req.body)
    res.status(result ? 201 : 500).json(result)
  })
  router.put('/', async (req, res) => {
    const result = await collection.save(req.body)
    res.status(result ? 200 : 500).json(result)
  })
  router.delete('/:id', async (req, res) => {
    const result = await collection.delete(req.params.id)
    res.status(result ? 200 : 500).json(result)
  })

  return router
}

module.exports = createRouter
