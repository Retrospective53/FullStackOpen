import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = e => {
    e.preventDefault()
    const newAnecdote = e.target.newAnect.value
    dispatch(createAnecdote(newAnecdote))
    dispatch(createNotification(`created anecdote '${e.target.newAnect.value}'`))
    setTimeout(() => dispatch(createNotification(null)), 5000)
    e.target.newAnect.value = ''
  }

  return(
<form onSubmit={handleCreate}>
  <h2>create new</h2>
  <div><input name='newAnect'/></div>
  <button>create</button>
</form>
  )
}

export default AnecdoteForm