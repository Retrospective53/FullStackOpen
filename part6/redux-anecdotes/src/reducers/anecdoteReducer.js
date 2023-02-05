import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// export const createAnecdote = anecdote => {
//   return {
//     type: 'CREATE',
//     payload: [anecdote]
//   }
// }

// export const createVote = id => {
//   return {
//     type: 'VOTE',
//     payload: id
//   }
// }


const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE':
//       return [...state.map(e => e.id === action.payload ? {...e, votes: e.votes + 1} : e)].sort((a, b) => b.votes - a.votes)
//     case 'CREATE':
//       return [...state, action.payload.map(asObject)[0]]
//   }
//   console.log('state now: ', state)
//   console.log('action', action)

//   return state
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createVote(state, action) {
      return state.map(e => e.id === action.payload
        ? {...e, votes: e.votes + 1}: e)
        .sort((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      console.log(action.payload)
      return state.concat(asObject(action.payload))
    }
  }
})

export const { createVote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer