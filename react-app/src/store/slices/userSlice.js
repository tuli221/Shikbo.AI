import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  userRole: null, // 'student' | 'instructor' | 'admin'
  profile: {
    name: '',
    email: '',
    avatar: '',
    enrolledCourses: [],
    completedCourses: [],
  },
  loading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
      state.userRole = action.payload.role
      state.profile = { ...state.profile, ...action.payload.profile }
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload }
    },
    logout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
      state.userRole = null
      state.profile = initialState.profile
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setUser, updateProfile, logout, setLoading, setError, clearError } = userSlice.actions

export default userSlice.reducer

// Selectors
export const selectUser = (state) => state.user.currentUser
export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export const selectUserRole = (state) => state.user.userRole
export const selectProfile = (state) => state.user.profile
