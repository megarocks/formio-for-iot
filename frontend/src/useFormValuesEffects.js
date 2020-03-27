import { useEffect, useState } from 'react'
import shortid from 'shortid'

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

export default ({ values, setValues, initialValues }) => {
  const [postfix] = useState(shortid.generate())
  const stringInitial = JSON.stringify(initialValues)

  // this effect will run when initial values changes
  // it will add add random id to id field, it its not there yet
  useEffect(() => {
    if (initialValues) {
      const { id = '' } = initialValues
      const idParts = id.split('_')
      const isAlreadyWithPostfix = idParts.length >= 2

      if (!isAlreadyWithPostfix) {
        let newId = postfix
        if (initialValues?.name?.length >= 3) {
          const prefix = initialValues.name.substr(0, 3)
          newId = `${prefix}_${newId}`
        }
        setValues({
          ...initialValues,
          id: newId,
        })
      }
    }
  }, [stringInitial])
}
