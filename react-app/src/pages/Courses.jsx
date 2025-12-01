import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  TrendingUp,
  Code,
  Database,
  Cpu,
  Palette,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { staggerContainer, staggerItem, fadeInUp } from '@/utils/animations'

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')

  const categories = [
    { id: 'all', label: 'All Courses', icon: TrendingUp },
    { id: 'web-development', label: 'Web Development', icon: Code },
    { id: 'data-science', label: 'Data Science', icon: Database },
    { id: 'machine-learning', label: 'Machine Learning', icon: Cpu },
    { id: 'design', label: 'UI/UX Design', icon: Palette },
  ]

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ]

  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Ahmed Shakil',
      category: 'web-development',
      level: 'beginner',
      image: 'https://via.placeholder.com/400x250',
      rating: 4.9,
      students: 2345,
      duration: '12 weeks',
      price: '৳5,000',
      description: 'Master HTML, CSS, JavaScript, React, and Node.js',
    },
    {
      id: 2,
      title: 'React & Laravel Full Stack',
      instructor: 'Shaikot Kundu',
      category: 'web-development',
      level: 'advanced',
      image: 'https://via.placeholder.com/400x250',
      rating: 4.8,
      students: 1890,
      duration: '10 weeks',
      price: '৳6,500',
      description: 'Build professional applications with React and Laravel',
    },
    {
      id: 3,
      title: 'Data Analysis with Python',
      instructor: 'Nusrat Jahan',
      category: 'data-science',
      level: 'intermediate',
      image: 'https://via.placeholder.com/400x250',
      rating: 4.7,
      students: 1456,
      duration: '8 weeks',
      price: '৳4,500',
      description: 'Learn to analyze, visualize, and predict data trends',
    },
    {
      id: 4,
      title: 'Machine Learning Fundamentals',
      instructor: 'Tanvir Hasan',
      category: 'machine-learning',
      level: 'intermediate',
      image: 'https://via.placeholder.com/400x250',
      rating: 4.9,
      students: 2100,
      duration: '14 weeks',
      price: '৳7,000',
      description: 'Introduction to ML algorithms and neural networks',
    },
    {
      id: 5,
      title: 'UI/UX Design Masterclass',
      instructor: 'Fatima Khan',
      category: 'design',
      level: 'beginner',
      image: 'https://via.placeholder.com/400x250',
      rating: 4.8,
      students: 1678,
      duration: '6 weeks',
      price: '৳3,500',
      description: 'Create beautiful and user-friendly interfaces',
    },
    {
      id: 6,
      title: 'Advanced JavaScript & TypeScript',
      instructor: 'Rafi Ahmed',
      category: 'web-development',
      level: 'advanced',
      image: 'https://via.placeholder.com/400x250',
      rating: 4.9,
      students: 1934,
      duration: '10 weeks',
      price: '৳5,500',
      description: 'Deep dive into modern JavaScript and TypeScript',
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 to-gray-900">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-emerald-900 to-emerald-950 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover courses designed to help you master new skills and advance your career
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full bg-white rounded-lg text-gray-800"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-black/30 backdrop-blur-sm py-6 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-white" />
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'text-white border-white/30 hover:bg-white/10'
                  }
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              {levels.map((level) => (
                <Button
                  key={level.id}
                  variant={selectedLevel === level.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLevel(level.id)}
                  className={
                    selectedLevel === level.id
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'text-white border-white/30 hover:bg-white/10'
                  }
                >
                  {level.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
            </h2>
          </div>

          {filteredCourses.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              {filteredCourses.map((course) => (
                <motion.div key={course.id} variants={staggerItem}>
                  <Link to={`/courses/${course.id}`}>
                    <Card className="bg-black/50 border-gray-700 hover:border-green-500 transition-all duration-300 overflow-hidden group h-full">
                      <div className="relative overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {course.price}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-2">
                          <span className="text-xs text-gray-400 uppercase tracking-wide">
                            {course.category.replace('-', ' ')}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition">
                          {course.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                        <div className="flex items-center gap-2 mb-4">
                          <img
                            src={`https://ui-avatars.com/api/?name=${course.instructor}&background=random`}
                            alt={course.instructor}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-gray-300">{course.instructor}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400 text-lg">No courses found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedLevel('all')
                }}
                className="mt-4 bg-green-600 hover:bg-green-700"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Courses
