const express = require('express')
const { omit } = require('lodash/fp')

const resources = [
  'definitions',
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

function createRouter({ db, resourceName }) {
  const router = express.Router()

  const collection = db.getCollection(resourceName)

  router.get('/', (req, res) => {
    let allItems = collection.find({})
    allItems = allItems.map((item) => omit(['$loki', 'meta'], item))
    res.json(allItems)
  })
  router.post('/', (req, res) => {
    collection.insertOne(req.body)
    res.status(201).end()
  })
  router.put('/', (req, res) => {
    collection.updateWhere(
      (item) => item.id === req.body.id,
      (item) => ({ ...item, ...req.body })
    )
    res.end()
  })
  router.delete('/:id', (req, res) => {
    const byField = req.query.byField || 'id'
    collection.removeWhere((item) => item[byField] === req.params.id)
    res.end()
  })

  return router
}

module.exports = {
  createRouter,
  resources,
}
