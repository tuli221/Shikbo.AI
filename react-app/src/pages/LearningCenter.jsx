import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Play,
  CheckCircle,
  Lock,
  Clock,
  FileText,
  Download,
  Award,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { fadeInUp } from '@/utils/animations'

const LearningCenter = () => {
  const { courseId } = useParams()
  const [selectedModule, setSelectedModule] = useState(0)
  const [selectedLesson, setSelectedLesson] = useState(0)
  const [expandedModules, setExpandedModules] = useState([0])

  const course = {
    id: 1,
    title: 'React & Laravel Full Stack Development',
    progress: 45,
    totalModules: 7,
    completedModules: 3,
    modules: [
      {
        id: 0,
        title: 'Module 1: React Fundamentals',
        duration: '6 hours',
        progress: 100,
        lessons: [
          { id: 0, title: 'Introduction to React', duration: '15:30', completed: true },
          { id: 1, title: 'JSX and Components', duration: '22:15', completed: true },
          { id: 2, title: 'Props and State', duration: '18:45', completed: true },
          { id: 3, title: 'React Hooks', duration: '25:10', completed: true },
          { id: 4, title: 'Module Quiz', type: 'quiz', completed: true },
        ],
      },
      {
        id: 1,
        title: 'Module 2: Advanced React Patterns',
        duration: '8 hours',
        progress: 60,
        lessons: [
          { id: 0, title: 'Context API', duration: '20:30', completed: true },
          { id: 1, title: 'Custom Hooks', duration: '28:15', completed: true },
          { id: 2, title: 'Performance Optimization', duration: '32:45', completed: false },
          { id: 3, title: 'Error Boundaries', duration: '18:10', completed: false },
          { id: 4, title: 'Module Assignment', type: 'assignment', completed: false },
        ],
      },
      {
        id: 2,
        title: 'Module 3: Laravel Backend Basics',
        duration: '10 hours',
        progress: 0,
        lessons: [
          { id: 0, title: 'Laravel Setup', duration: '15:30', completed: false, locked: true },
          { id: 1, title: 'MVC Architecture', duration: '22:15', completed: false, locked: true },
          { id: 2, title: 'Routing', duration: '18:45', completed: false, locked: true },
          { id: 3, title: 'Controllers', duration: '25:10', completed: false, locked: true },
          { id: 4, title: 'Module Quiz', type: 'quiz', completed: false, locked: true },
        ],
      },
    ],
  }

  const currentLesson = course.modules[selectedModule].lessons[selectedLesson]

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    )
  }

  const handleLessonClick = (moduleId, lessonId, locked) => {
    if (!locked) {
      setSelectedModule(moduleId)
      setSelectedLesson(lessonId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/student-dashboard" className="text-blue-600 hover:text-blue-700">
              ← Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold text-gray-800 hidden md:block">{course.title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Progress: <span className="font-bold text-blue-600">{course.progress}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar - Module List */}
        <aside className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-bold text-gray-800 mb-2">Course Content</h2>
            <div className="text-sm text-gray-600">
              {course.completedModules} of {course.totalModules} modules completed
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="p-2">
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id} className="mb-2">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2 flex-1">
                    {module.progress === 100 ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                    )}
                    <div className="text-left">
                      <div className="font-semibold text-sm text-gray-800">{module.title}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {module.duration}
                      </div>
                    </div>
                  </div>
                  {expandedModules.includes(module.id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {expandedModules.includes(module.id) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(moduleIndex, lessonIndex, lesson.locked)}
                        disabled={lesson.locked}
                        className={`w-full flex items-center gap-2 p-2 rounded text-sm transition ${
                          selectedModule === moduleIndex && selectedLesson === lessonIndex
                            ? 'bg-blue-50 text-blue-600'
                            : lesson.locked
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : lesson.locked ? (
                          <Lock className="w-4 h-4" />
                        ) : lesson.type === 'quiz' ? (
                          <FileText className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        <span className="flex-1 text-left truncate">{lesson.title}</span>
                        {lesson.duration && (
                          <span className="text-xs text-gray-400">{lesson.duration}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6">
            {/* Video Player */}
            <motion.div
              key={`${selectedModule}-${selectedLesson}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card>
                <CardContent className="p-0">
                  {currentLesson.type === 'quiz' ? (
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-20 h-20 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Module Quiz</h3>
                        <p className="text-gray-600 mb-6">
                          Test your knowledge from this module
                        </p>
                        <Button className="bg-purple-600 hover:bg-purple-700">Start Quiz</Button>
                      </div>
                    </div>
                  ) : currentLesson.type === 'assignment' ? (
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-20 h-20 text-orange-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Module Assignment</h3>
                        <p className="text-gray-600 mb-6">
                          Complete this assignment to proceed
                        </p>
                        <Button className="bg-orange-600 hover:bg-orange-700">
                          View Assignment
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-black flex items-center justify-center relative">
                      <div className="text-center">
                        <Play className="w-20 h-20 text-white mb-4 mx-auto" />
                        <p className="text-white">Video Player</p>
                        <p className="text-gray-300 text-sm mt-2">
                          {currentLesson.title} - {currentLesson.duration}
                        </p>
                      </div>
                      {currentLesson.completed && (
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentLesson.title}</h2>
                <p className="text-gray-600">
                  {course.modules[selectedModule].title} • Lesson {selectedLesson + 1}
                </p>
              </div>
            </motion.div>

            {/* Lesson Controls */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                disabled={selectedLesson === 0 && selectedModule === 0}
                onClick={() => {
                  if (selectedLesson > 0) {
                    setSelectedLesson(selectedLesson - 1)
                  } else if (selectedModule > 0) {
                    setSelectedModule(selectedModule - 1)
                    setSelectedLesson(
                      course.modules[selectedModule - 1].lessons.length - 1
                    )
                  }
                }}
              >
                ← Previous Lesson
              </Button>

              {!currentLesson.completed && currentLesson.type !== 'quiz' && currentLesson.type !== 'assignment' && (
                <Button className="bg-green-600 hover:bg-green-700">Mark as Complete</Button>
              )}

              <Button
                disabled={
                  selectedLesson === course.modules[selectedModule].lessons.length - 1 &&
                  selectedModule === course.modules.length - 1
                }
                onClick={() => {
                  if (
                    selectedLesson <
                    course.modules[selectedModule].lessons.length - 1
                  ) {
                    setSelectedLesson(selectedLesson + 1)
                  } else if (selectedModule < course.modules.length - 1) {
                    setSelectedModule(selectedModule + 1)
                    setSelectedLesson(0)
                  }
                }}
              >
                Next Lesson →
              </Button>
            </div>

            {/* Resources & Downloads */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Lesson Resources</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-semibold text-sm">Lesson Notes.pdf</div>
                        <div className="text-xs text-gray-500">2.4 MB</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-semibold text-sm">Source Code.zip</div>
                        <div className="text-xs text-gray-500">1.1 MB</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Section */}
            {course.progress === 100 && (
              <motion.div variants={fadeInUp} className="mt-6">
                <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="p-6 text-center">
                    <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Congratulations! 🎉
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You've completed this course. Download your certificate now!
                    </p>
                    <Button className="bg-yellow-600 hover:bg-yellow-700">
                      <Download className="w-5 h-5 mr-2" />
                      Download Certificate
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default LearningCenter
