import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  BookOpen,
  MessageSquare,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Clock,
  Users,
  TrendingUp,
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/userSlice'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const StudentDashboard = () => {
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
      title: 'Enrolled Courses',
      value: '8',
      gradient: 'from-green-700 to-green-300',
    },
    {
      id: 2,
      title: 'Completed Courses',
      value: '3',
      gradient: 'from-green-700 to-green-300',
    },
    {
      id: 3,
      title: 'Certificates Earned',
      value: '3',
      gradient: 'from-green-700 to-green-300',
    },
  ]

  const recommendedCourses = [
    {
      id: 1,
      title: 'Advanced JavaScript',
      instructor: 'John Doe',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.8,
      students: 1200,
      duration: '6 weeks',
    },
    {
      id: 2,
      title: 'React Mastery',
      instructor: 'Jane Smith',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.9,
      students: 1500,
      duration: '8 weeks',
    },
    {
      id: 3,
      title: 'Python for Data Science',
      instructor: 'Mike Johnson',
      image: 'https://via.placeholder.com/300x200',
      rating: 4.7,
      students: 900,
      duration: '10 weeks',
    },
  ]

  const upcomingClasses = [
    {
      id: 1,
      course: 'Web Development Bootcamp',
      instructor: 'Ahmed Shakil',
      date: 'Dec 5, 2025',
      time: '10:00 AM',
    },
    {
      id: 2,
      course: 'Machine Learning Basics',
      instructor: 'Shaikot Kundu',
      date: 'Dec 6, 2025',
      time: '2:00 PM',
    },
    {
      id: 3,
      course: 'UI/UX Design Fundamentals',
      instructor: 'Nusrat Jahan',
      date: 'Dec 7, 2025',
      time: '4:00 PM',
    },
  ]

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/student-dashboard' },
    { icon: BookOpen, label: 'My Courses', path: '/my-courses' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Award, label: 'Certificates', path: '/certificates' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`w-68 bg-white shadow-md p-6 fixed md:static inset-y-0 left-0 z-20 transform ${
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
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
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
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back, Student!</h1>
          </div>

          <div className="flex items-center gap-4 bg-white shadow-md px-4 py-1 rounded-full">
            <button className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
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
                <CardContent className="p-5 flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">{stat.title}</p>
                    <h3 className="text-4xl font-bold mt-2">{stat.value}</h3>
                  </div>
                  <TrendingUp className="w-12 h-12 opacity-50" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Recommended Courses */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recommended Courses</h2>
            <Link to="/courses">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {recommendedCourses.map((course) => (
              <motion.div key={course.id} variants={staggerItem}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        ⭐ {course.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                    </div>
                    <Link to={`/courses/${course.id}`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Enroll Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Upcoming Live Classes */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Live Classes</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingClasses.map((classItem) => (
                  <motion.div
                    key={classItem.id}
                    className="p-4 hover:bg-gray-50 transition"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{classItem.course}</h3>
                        <p className="text-sm text-gray-600">Instructor: {classItem.instructor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">{classItem.date}</p>
                        <p className="text-sm text-gray-600">{classItem.time}</p>
                      </div>
                      <Link to="/live-class" className="ml-4">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Join
                        </Button>
                      </Link>
                    </div>
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

export default StudentDashboard
