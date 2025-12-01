import axios from 'axios'
import { toast } from 'react-toastify'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong'
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
      toast.error('Session expired. Please login again.')
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.')
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else {
      toast.error(message)
    }
    
    return Promise.reject(error)
  }
)

export default api

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  verifyToken: () => api.get('/auth/verify'),
}

export const courseAPI = {
  getAll: (filters) => api.get('/courses', { params: filters }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (courseData) => api.post('/courses', courseData),
  update: (id, courseData) => api.put(`/courses/${id}`, courseData),
  delete: (id) => api.delete(`/courses/${id}`),
  enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
  unenroll: (courseId) => api.delete(`/courses/${courseId}/enroll`),
}

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData) => api.put('/user/profile', userData),
  getEnrolledCourses: () => api.get('/user/courses'),
  getProgress: (courseId) => api.get(`/user/courses/${courseId}/progress`),
}

export const instructorAPI = {
  getCourses: () => api.get('/instructor/courses'),
  getStudents: (courseId) => api.get(`/instructor/courses/${courseId}/students`),
  getAnalytics: () => api.get('/instructor/analytics'),
}

export const adminAPI = {
  getUsers: (filters) => api.get('/admin/users', { params: filters }),
  updateUser: (id, userData) => api.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAnalytics: () => api.get('/admin/analytics'),
}

export const paymentAPI = {
  initiate: (paymentData) => api.post('/payments/initiate', paymentData),
  verify: (paymentId) => api.post(`/payments/${paymentId}/verify`),
  getHistory: () => api.get('/payments/history'),
}
