import { useEffect, useState } from 'react'
import shortid from 'shortid'

export default ({ values, setValues, initialValues }) => {
  const [postfix] = useState(shortid.generate())
  const stringInitial = JSON.stringify(initialValues)
  useEffect(() => {
    let newId = postfix
    if (initialValues?.name?.length >= 3) {
      const prefix = initialValues.name.substr(0, 3)
      newId = `${prefix}_${newId}`
    }
    setValues({
      ...initialValues,
      id: newId,
    })
  }, [stringInitial])
}
