import { useMutation, useQueryClient } from "react-query"
import anecdoteService from '../requests'
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = ({ anecdotes }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryCLient = useQueryClient()
  const newMutation = useMutation(anecdoteService.createNew, { 
    onError: error => {
      notificationDispatch({ type: 'SET', payload: error.response.data.error},
      setTimeout(() => notificationDispatch({ type: 'NULL'}), 5000))
    },
    onSuccess: content => {
    queryCLient.setQueryData('anecdotes', anecdotes.concat(content))
  }})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
