const fs = require('fs').promises
const path = require('path')

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
        const itemPath = path.join(dirPath, `${itemData.id}.json`)
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
        const itemPath = path.join(dirPath, `${id}.json`)
        await fs.unlink(itemPath)
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    },
  }
}
