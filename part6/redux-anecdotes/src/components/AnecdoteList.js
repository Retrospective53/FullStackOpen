import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'


const AnecdotesList = () => {
  const logs = useSelector(state => state)
  const anecdotes = useSelector(state => state.anecdotes)
  const anecdotesFilter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(anecdotesFilter.toLowerCase()))
  
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(createVote(anecdote.id))
    dispatch(createNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => 
    dispatch(removeNotification())
    , 5000
    )
  }

  return(
    <>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      <button onClick={() => console.log(logs)}>log</button>
    </>
  )
}

export default AnecdotesList