import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, delay) => {
  return async dispatch => {
    dispatch(createNotification(message))
    console.log(delay)
    setTimeout(() => dispatch(removeNotification()), delay*1000)
  }
}

export default notificationSlice.reducer