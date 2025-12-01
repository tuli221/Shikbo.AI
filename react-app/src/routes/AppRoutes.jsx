import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUserRole } from '@/store/slices/userSlice'
import MainLayout from '@/layouts/MainLayout'
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// Lazy load other pages
import { lazy, Suspense } from 'react'

const StudentDashboard = lazy(() => import('@/pages/StudentDashboard'))
const InstructorDashboard = lazy(() => import('@/pages/InstructorDashboard'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
const Courses = lazy(() => import('@/pages/Courses'))
const CourseDetails = lazy(() => import('@/pages/CourseDetails'))
const Payment = lazy(() => import('@/pages/Payment'))
const Chatbot = lazy(() => import('@/pages/Chatbot'))
const LearningCenter = lazy(() => import('@/pages/LearningCenter'))
const LiveClass = lazy(() => import('@/pages/LiveClass'))

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const userRole = useSelector(selectUserRole)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />
  }

  return children
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes with Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>

        {/* Auth Routes (No Layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Student */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/learning-center/:courseId"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <LearningCenter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live-class/:classId"
          element={
            <ProtectedRoute allowedRoles={['student', 'instructor']}>
              <LiveClass />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Instructor */}
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Payment (Protected) */}
        <Route
          path="/payment/:courseId"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
