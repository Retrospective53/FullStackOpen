import AnecdoteForm from './components/AnectdoteForm'
import AnecdotesList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdotesList/>      
      <AnecdoteForm/>
    </div>
  )
}

export default App