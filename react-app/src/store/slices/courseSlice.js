import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  filters: {
    category: 'all',
    level: 'all',
    sortBy: 'popular',
  },
  loading: false,
  error: null,
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload
    },
    addEnrolledCourse: (state, action) => {
      state.enrolledCourses.push(action.payload)
    },
    removeEnrolledCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.id !== action.payload
      )
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
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

export const {
  setCourses,
  setCurrentCourse,
  addEnrolledCourse,
  removeEnrolledCourse,
  setFilters,
  setLoading,
  setError,
  clearError,
} = courseSlice.actions

export default courseSlice.reducer

// Selectors
export const selectCourses = (state) => state.course.courses
export const selectCurrentCourse = (state) => state.course.currentCourse
export const selectEnrolledCourses = (state) => state.course.enrolledCourses
export const selectFilters = (state) => state.course.filters
