import axios from 'axios'
import { useState } from 'react'

// this custom hooks introduce logic for communication with backend app

const transport = axios.create({
  baseURL: 'http://localhost:3001/api',
})

const useApiResource = (resource) => {
  const resourcePath = `/${resource}`

  const [data, setData] = useState()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  async function fetch() {
    try {
      setIsLoading(true)
      const response = await transport.get(resourcePath)
      setData(response.data)
      setError(undefined)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  async function create(data) {
    try {
      setIsLoading(true)
      setError(undefined)
      await transport.post(resourcePath, data)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  async function update(data) {
    try {
      setIsLoading(true)
      setError(undefined)
      await transport.put(resourcePath, data)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  async function remove(id) {
    try {
      setIsLoading(true)
      await transport.delete(`${resourcePath}/${id}`)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data,
    error,
    isLoading,
    fetch,
    create,
    update,
    remove,
  }
}

export default useApiResource
