import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  Award,
  PlayCircle,
  Download,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations'
import { toast } from 'react-toastify'

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [expandedModules, setExpandedModules] = useState({})

  const course = {
    id: 1,
    title: 'React & Laravel Full Stack Development',
    description:
      'Master modern full-stack development with React and Laravel. Build production-ready applications from scratch.',
    instructor: {
      name: 'Ahmed Shakil & Shaikot Kundu Akash',
      initials: 'AS&SKA',
      avatar: '',
    },
    rating: 4.9,
    students: 100,
    duration: '3 months',
    level: 'Advanced',
    price: '৳6,500',
    image: 'https://via.placeholder.com/800x400',
    whatYouLearn: [
      'Build modern web applications with React and Laravel',
      'Implement RESTful APIs and authentication',
      'Master state management with Redux',
      'Deploy applications to production',
    ],
    requirements: [
      'Basic knowledge of JavaScript',
      'Understanding of HTML and CSS',
      'Familiarity with programming concepts',
    ],
    modules: [
      {
        id: 1,
        title: 'React Fundamentals',
        description: 'JSX, components, hooks, routing',
        lessons: ['Introduction to React', 'Components and Props', 'State and Hooks', 'React Router'],
      },
      {
        id: 2,
        title: 'Laravel Backend Basics',
        description: 'MVC architecture, routing, middleware',
        lessons: ['Laravel Setup', 'Routing and Controllers', 'Eloquent ORM', 'Middleware'],
      },
      {
        id: 3,
        title: 'Authentication & Security',
        description: 'Laravel Sanctum, JWT auth, secure sessions',
        lessons: ['Authentication Basics', 'JWT Implementation', 'Role-Based Access', 'Security Best Practices'],
      },
      {
        id: 4,
        title: 'API Integration',
        description: 'Connect React frontend with Laravel backend, REST APIs, Axios',
        lessons: ['RESTful API Design', 'Axios Setup', 'Data Fetching', 'Error Handling'],
      },
      {
        id: 5,
        title: 'Database Management',
        description: 'Migrations, relationships, Eloquent ORM and CRUD',
        lessons: ['Database Design', 'Migrations', 'Eloquent Relationships', 'Advanced Queries'],
      },
      {
        id: 6,
        title: 'Advanced Form Handling',
        description: 'Validation, file uploads, error handling and UX tips',
        lessons: ['Form Validation', 'File Uploads', 'Error Messages', 'User Feedback'],
      },
      {
        id: 7,
        title: 'Deployment',
        description: 'Deploy Laravel API and React frontend (Docker, hosting, config)',
        lessons: ['Docker Setup', 'CI/CD Pipeline', 'Deployment Platforms', 'Performance Optimization'],
      },
    ],
  }

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  const handleEnroll = () => {
    toast.success('Redirecting to payment...')
    navigate(`/payment/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar Placeholder - would use actual navbar */}
      <header className="bg-white text-gray-900 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/">
            <img src="/Shikbo.AI.png" alt="Shikhbo.AI" className="h-10" />
          </Link>
          <nav className="space-x-8 font-semibold text-gray-700 hidden md:flex">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <Link to="/courses" className="hover:text-green-600">Courses</Link>
            <Link to="/about" className="hover:text-green-600">About</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/courses"
            className="flex items-center gap-2 text-gray-300 hover:text-green-400 mb-6 transition inline-flex"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left Side */}
            <motion.div initial="initial" animate="animate" variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{course.title}</h1>
              <p className="text-lg text-gray-300 mb-6">{course.description}</p>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span>({course.students} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>{course.level}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Enrollment Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gray-800 rounded-3xl shadow-xl sticky top-6">
                <CardContent className="p-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full rounded-xl mb-4"
                  />
                  <div className="text-center mb-6">
                    <p className="text-4xl font-bold text-green-400 mb-2">{course.price}</p>
                    <p className="text-gray-400">One-time payment</p>
                  </div>
                  <Button
                    onClick={handleEnroll}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg mb-4"
                  >
                    Enroll Now
                  </Button>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-green-400" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-green-400" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-400" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Course Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <Card className="bg-black/50 backdrop-blur-xl rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouLearn.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Course Modules */}
            <Card className="bg-black/50 backdrop-blur-xl rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Course Modules</h2>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="bg-gray-800 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-700 transition"
                        >
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-black font-bold flex-shrink-0">
                              {module.id}
                            </div>
                            <div>
                              <p className="text-lg font-semibold">{module.title}</p>
                              <p className="text-sm text-gray-400">{module.description}</p>
                            </div>
                          </div>
                          {expandedModules[module.id] ? (
                            <ChevronDown className="w-6 h-6 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-6 h-6 text-gray-400" />
                          )}
                        </button>
                        {expandedModules[module.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-700"
                          >
                            <ul className="p-4 pl-16 space-y-2">
                              {module.lessons.map((lesson, idx) => (
                                <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                                  <PlayCircle className="w-4 h-4" />
                                  {lesson}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-black/50 backdrop-blur-xl rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Instructor & Course Details */}
          <div className="space-y-8">
            {/* Instructor Card */}
            <Card className="bg-black/50 backdrop-blur-xl rounded-3xl shadow-xl text-center">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Instructor</h3>
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
                    {course.instructor.initials}
                  </div>
                </div>
                <h4 className="text-xl font-semibold">{course.instructor.name}</h4>
                <p className="text-gray-400 text-sm mt-1">Expert Instructor</p>
              </CardContent>
            </Card>

            {/* Course Details Card */}
            <Card className="bg-black/50 backdrop-blur-xl rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Course Details</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students</span>
                    <span className="font-semibold">{course.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating</span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Star className="w-4 h-4 text-green-500 fill-current" />
                      {course.rating}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level</span>
                    <span className="font-semibold">{course.level}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
