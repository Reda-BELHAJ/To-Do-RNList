import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
  name: 'task',
  initialState: {
    title: '',
    description: '',
    color: {colorItem: '', icon: ''},
    done: false
  },
  reducers: {
    setTitle: (state, action) => {
        state.title = action.payload
    },
    setDescription: (state, action) => {
        state.description = action.payload
    },
    setDone: (state, action) => {
        state.done = action.payload
    },
    setColor: (state, action) => {
      state.color = action.payload
  },
  }
})

export const { setTitle, setDescription, setDone, setColor } = navSlice.actions

export const selectTitle = (state) => state.task.title
export const selectDescription = (state) => state.task.description
export const selectDone = (state) => state.task.done
export const selectColor = (state) => state.task.color

export default navSlice.reducer