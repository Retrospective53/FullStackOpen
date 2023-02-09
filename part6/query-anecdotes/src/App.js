import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation } from 'react-query'
import anecdoteService from './requests'

const App = () => {
  const result = useQuery('anecdotes', anecdoteService.getAll, { retry: false, refetchOnWindowFocus: false })
  console.log(result)
  if (!result.isSuccess) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm anecdotes={anecdotes}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      <button onClick={() => console.log(anecdotes)}>loggg</button>
    </div>
  )
}

export default App
