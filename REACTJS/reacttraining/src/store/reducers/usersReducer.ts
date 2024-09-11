/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserModel, UsersState, UserData } from './../../types/user';
import { fetchData } from '../../utils/fetchData';

export const fetchListUsers = createAsyncThunk(
  'users/fetchListUsers',
  async () => {
    // console.log('postId ', postId)
    try {
      const usersResponse = await fetchData('users');
      return { users: usersResponse, error: null }
    } catch (error) {
      return { error };
      // console.error('Error fetching posts:', error);
    }
  }
);

const initialState: UsersState = {
  ids: [],
	data: {},
  loading: 'idle', // 'idle | 'loading' | 'succeed' | 'failed'
  error: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListUsers.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
			const users = action.payload?.users || []; 
			const userObj: UserData = {}
			state.ids = users.map((user: UserModel) => {
				userObj[user.id] = user
				return user.id
			})
			state.data = userObj
			state.error = action.payload?.error as string
      state.loading = 'succeed';
    });
    builder.addCase(fetchListUsers.rejected, (state, action) => {
      state.loading = 'failed';
    });
  },
});

export const usersReducer = usersSlice.reducer;