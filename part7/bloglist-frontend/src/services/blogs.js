import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  return await axios.post(baseUrl, newObject, config)
}

const updateLike = async (id, newObject) => {
  const increaseLike = {
    ...newObject,
    likes: newObject.likes + 1
  }

  return await axios.put(`${baseUrl}/${id}`, increaseLike)
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  return await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, updateLike, deleteBlog, setToken }