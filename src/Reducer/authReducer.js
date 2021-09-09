import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {uid: '', email: '', displayName: ''}
    },
    reducers: {
        signIn: (state, action) => {
            state.user = action.payload
        },
        signOut: (state) => {
            state.user = null
        }
    },
})

export const { signIn, signOut } = authSlice.actions

export const selectUser = (state) => state.auth.user

export default authSlice.reducer