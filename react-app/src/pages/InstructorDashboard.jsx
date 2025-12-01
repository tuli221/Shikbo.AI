import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  TrendingUp,
  DollarSign,
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/userSlice'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { staggerContainer, staggerItem } from '@/utils/animations'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { formatCurrency } from '@/utils/helpers'

const InstructorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const stats = [
    {
      id: 1,
      title: 'Total Courses',
      value: '12',
      icon: BookOpen,
      gradient: 'from-indigo-600 to-indigo-500',
    },
    {
      id: 2,
      title: 'Total Students',
      value: '1,240',
      icon: Users,
      gradient: 'from-green-500 to-green-600',
    },
    {
      id: 3,
      title: 'Earnings',
      value: '৳85,000',
      icon: DollarSign,
      gradient: 'from-purple-500 to-purple-600',
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      students: 156,
      rating: 4.8,
      revenue: '৳25,000',
      status: 'Active',
    },
    {
      id: 2,
      title: 'React & Laravel Full Stack',
      students: 98,
      rating: 4.9,
      revenue: '৳18,500',
      status: 'Active',
    },
    {
      id: 3,
      title: 'Python for Beginners',
      students: 234,
      rating: 4.7,
      revenue: '৳32,000',
      status: 'Active',
    },
  ]

  const studentEngagement = [
    { month: 'Jan', students: 120 },
    { month: 'Feb', students: 180 },
    { month: 'Mar', students: 240 },
    { month: 'Apr', students: 320 },
    { month: 'May', students: 450 },
    { month: 'Jun', students: 580 },
  ]

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/instructor-dashboard' },
    { icon: BookOpen, label: 'My Courses', path: '/instructor/courses' },
    { icon: Users, label: 'Students', path: '/instructor/students' },
    { icon: BarChart3, label: 'Analytics', path: '/instructor/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`w-68 bg-white border-r shadow-lg p-6 fixed md:static inset-y-0 left-0 z-20 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/Shikbo.AI.png" alt="Shikbo.ai Logo" className="h-10 w-auto rounded-md" />
          </Link>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-1 mt-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 w-full transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 ml-0 md:ml-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Instructor Dashboard</h1>
          </div>

          <div className="flex items-center gap-4 bg-white shadow-md px-4 py-1 rounded-full">
            <button className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                5
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} variants={staggerItem}>
              <Card
                className={`bg-gradient-to-r ${stat.gradient} text-white shadow-lg hover:shadow-xl transition-shadow`}
              >
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-white text-lg opacity-90">{stat.title}</p>
                    <h3 className="text-5xl font-bold mt-2">{stat.value}</h3>
                  </div>
                  <stat.icon className="w-16 h-16 opacity-50" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Recent Courses */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Courses</h2>
            <Link to="/instructor/courses">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentCourses.map((course) => (
                      <motion.tr
                        key={course.id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className="transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.students}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-sm text-yellow-500">
                            ⭐ {course.rating}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-green-600">
                            {course.revenue}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {course.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link to={`/instructor/courses/${course.id}`}>
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Student Engagement Chart */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Engagement</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-end justify-between h-64 gap-4">
                {studentEngagement.map((data, index) => (
                  <motion.div
                    key={data.month}
                    className="flex-1 flex flex-col items-center"
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.students / 600) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg flex items-end justify-center pb-2">
                      <span className="text-white font-semibold text-sm">{data.students}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{data.month}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

export default InstructorDashboard
