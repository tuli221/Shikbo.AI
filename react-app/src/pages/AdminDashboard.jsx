import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  Users,
  BookOpen,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/userSlice'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { staggerContainer, staggerItem } from '@/utils/animations'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminDashboard = () => {
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
      title: 'Total Users',
      value: '2,543',
      change: '+12%',
      icon: Users,
      gradient: 'from-blue-600 to-blue-500',
    },
    {
      id: 2,
      title: 'Total Courses',
      value: '156',
      change: '+8%',
      icon: BookOpen,
      gradient: 'from-green-600 to-green-500',
    },
    {
      id: 3,
      title: 'Revenue',
      value: '৳5.2M',
      change: '+23%',
      icon: DollarSign,
      gradient: 'from-purple-600 to-purple-500',
    },
    {
      id: 4,
      title: 'Active Students',
      value: '1,893',
      change: '+15%',
      icon: TrendingUp,
      gradient: 'from-orange-600 to-orange-500',
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: 'Ahmed Rahman',
      email: 'ahmed@example.com',
      role: 'Student',
      joinDate: 'Nov 28, 2025',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Nusrat Jahan',
      email: 'nusrat@example.com',
      role: 'Instructor',
      joinDate: 'Nov 27, 2025',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Tanvir Hossain',
      email: 'tanvir@example.com',
      role: 'Student',
      joinDate: 'Nov 26, 2025',
      status: 'Pending',
    },
    {
      id: 4,
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      role: 'Instructor',
      joinDate: 'Nov 25, 2025',
      status: 'Active',
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'John Doe',
      students: 234,
      revenue: '৳45,000',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Python Machine Learning',
      instructor: 'Jane Smith',
      students: 189,
      revenue: '৳38,500',
      status: 'Published',
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'Mike Johnson',
      students: 156,
      revenue: '৳32,000',
      status: 'Draft',
    },
  ]

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/admin-dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
    { icon: DollarSign, label: 'Revenue', path: '/admin/revenue' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ]

  const handleDeleteUser = (userId) => {
    toast.success(`User ${userId} deleted successfully`)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r shadow-lg p-6 fixed md:static inset-y-0 left-0 z-20 transform ${
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
      <main className="flex-1 p-6 md:p-10">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4 bg-white shadow-md px-4 py-2 rounded-full">
            <button className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                8
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {stats.map((stat) => (
            <motion.div key={stat.id} variants={staggerItem}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Recent Users */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Users</h2>
            <Link to="/admin/users">
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
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Date
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
                    {recentUsers.map((user) => (
                      <motion.tr
                        key={user.id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                        className="transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'Instructor'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{user.joinDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Courses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Courses</h2>
            <Link to="/admin/courses">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Students:</span>
                        <span className="font-semibold">{course.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-semibold text-green-600">{course.revenue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Status:</span>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            course.status === 'Published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
