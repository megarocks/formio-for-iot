const loki = require('lokijs')

const { resources } = require('./createResourceRouter')

module.exports = new Promise((resolve) => {
  const db = new loki('iot.db', {
    verbose: true,
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000,
  })

  function databaseInitialize() {
    afterLoad()
    resolve(db)
  }

  function afterLoad() {
    for (const resource of resources) {
      db.addCollection(resource)
    }
  }
})
