import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN } from './../actions'

const login = createAsyncThunk('login', () => {
	// fetch /auth
	// const auth = {}
	// compare
	
	return null
	// Challenge 14:
	/**
	 * install json server
	 * implement login
	 */
})

const initialState = {
  isLoggedIn: false,
	loading: 'idle',
	error: ''
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(login.fulfilled, (state, action) => {
			console.log('state ', state)
			console.log('action ', action)
			state.isLoggedIn = true
		})
		builder.addCase(login.rejected, (state, action) => {
			console.log('state ', state)
			console.log('action ', action)
			state.isLoggedIn = false
			state.error = 'Username or password is not correct'
		})
		// builder.addCase(''posts/fetchListPosts_REQUESTED', () => {

		// })

		// REQUEST -> loading
		// SUCCEED -> update data -> !loading
		// FAILED -> update
	},
})

export const authReducer = authSlice.reducer