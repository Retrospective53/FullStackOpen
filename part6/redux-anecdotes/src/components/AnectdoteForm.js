import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, setNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = async e => {
    e.preventDefault()
    const content = e.target.newAnect.value
    console.log(content)
    dispatch(createAnecdote(content))
    dispatch(setNotification(`created anecdote '${e.target.newAnect.value}'`, 5))
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