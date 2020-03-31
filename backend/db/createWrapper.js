const fs = require('fs').promises
const path = require('path')
const sanitizeFileName = require("sanitize-filename")

module.exports = async (directory) => {
  const dirPath = path.join(__dirname, directory)

  // create collection directory if it's not exist yet
  try {
    await fs.access(dirPath)
  } catch (e) {
    if (e.code === 'ENOENT') await fs.mkdir(dirPath)
  }

  return {
    getAll: async () => {
      try {
        const dirItems = await fs.readdir(dirPath)

        const jsonItems = []
        for (const item of dirItems) {
          const itemPath = path.join(dirPath, item)
          const itemStringContent = await fs.readFile(itemPath, 'utf8')
          const itemParsedJson = JSON.parse(itemStringContent)
          jsonItems.push(itemParsedJson)
        }
        return jsonItems
      } catch (e) {
        console.log(e)
        return []
      }
    },
    save: async (itemData) => {
      try {
        // if name in file data
        // if there is a file with {id}.json
        // delete it and write information to name-id.json
        if (itemData.name) {
          const mayBeOldFilePath = path.join(dirPath, createItemFileName({ id: itemData.id }))
          try {
            await fs.unlink(mayBeOldFilePath)
          } catch (e) {}
        }

        const itemPath = path.join(dirPath, createItemFileName(itemData))
        const itemStringContent = JSON.stringify(itemData)
        await fs.writeFile(itemPath, itemStringContent)
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    },
    delete: async (id) => {
      try {
        const itemPath = path.join(dirPath, createItemFileName({ id }))
        await fs.unlink(itemPath)
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    },
  }
}

function createItemFileName(itemData = {}) {
  let { name, id } = itemData
  name = name ? `${name}-${id}.json` : `${id}.json`
  name = name.replace(' ', '_')
  name = sanitizeFileName(name)
  return name
}
