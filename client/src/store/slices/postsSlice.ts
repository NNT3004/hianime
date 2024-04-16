import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface PostsState {
  value: number
}

const initialState: PostsState = {
  value: 0
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  }
})

export const { } = postsSlice.actions

export const selectValue = (state: RootState) => state.posts.value

export default postsSlice.reducer