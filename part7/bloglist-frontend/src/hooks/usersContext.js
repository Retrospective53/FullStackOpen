import { createContext, useContext, useReducer } from 'react'

const usersReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload
  case 'NULL':
    return null
  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = props => {
  const [users, usersDispatch] = useReducer(userReducer, null)

  return(
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export default UserContext