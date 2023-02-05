import { createSlice } from "@reduxjs/toolkit"

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const createFilter = filter => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter
//   }
// }

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createFilter(state, action) {
      return action.payload
    }
  }

})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer