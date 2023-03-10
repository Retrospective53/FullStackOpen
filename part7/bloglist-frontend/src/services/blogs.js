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
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLike = async newObject => {
  // const increaseLike = {
  //   ...newObject,
  //   likes: newObject.likes + 1
  // }
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
  return id
}

const getComments = async id => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const createComment = async newObject => {
  const response = await axios.post(`${baseUrl}/${newObject.id}/comments`, newObject.comment)
  return response.data
}

export default { getAll, create, updateLike, deleteBlog, setToken, getComments, createComment }