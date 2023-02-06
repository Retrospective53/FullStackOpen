import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data.sort((a, b) => b.votes - a.votes)
}
const createNew = async content => {
  const asObject = (anecdote) => {
    return {
      content: anecdote,
      votes: 0
    }
  }
  const response = await axios.post(baseUrl, asObject(content))
  return response.data
}

const updateAnecdote = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, createNew, updateAnecdote }