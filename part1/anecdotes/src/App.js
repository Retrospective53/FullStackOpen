import { useState } from 'react'

const DisplayAnectdote = ({anecdotes, vote, text}) => {
  return(
    <>
      <h2>{text}</h2>
      <p>{anecdotes}</p>
      <p>has {vote} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const handleRandom = () => setSelected(Math.floor(Math.random()*6))

  const voting = () => {
    const newVote = [...vote]
    newVote[selected] += 1
    setVote(newVote)
  }


  
  return (
    <div>
      <DisplayAnectdote text={'Anectdote of the day'} anecdotes={anecdotes[selected]} vote={vote[selected]} selected={selected}/>
      <button type='button' onClick={voting}>vote</button>
      <button type='button' onClick={handleRandom}>next anectdoe</button>
      <button type='button' onClick={() => console.table(vote)}>log</button>
      <br/>
      <DisplayAnectdote text={'Anectdote of the day'} anecdotes={anecdotes[vote.indexOf(Math.max(...vote))]} vote={vote[vote.indexOf(Math.max(...vote))]} selected={selected}/>
    </div>
  )
}

export default App;