import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { fadeInUp, staggerContainer } from '@/utils/animations'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your AI Learning Assistant. How can I help you today?',
      sender: 'bot',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const suggestedQuestions = [
    'What course should I start for web development?',
    'Explain Machine Learning in simple words',
    'Give me a roadmap to become a data analyst',
    'Which course is best for beginners?',
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('web development') || lowerMessage.includes('web dev')) {
      return 'For web development, I recommend starting with our "React & Laravel Full Stack Development" course. It covers both frontend (React) and backend (Laravel) technologies. You\'ll learn HTML, CSS, JavaScript, React hooks, and Laravel framework. This course is perfect for building modern web applications!'
    }

    if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
      return 'Machine Learning is a type of artificial intelligence where computers learn from data without being explicitly programmed. Think of it like teaching a child - you show examples, and they learn patterns. For example, showing a computer thousands of cat pictures helps it recognize cats in new images. Our "Machine Learning Fundamentals" course breaks this down step by step!'
    }

    if (lowerMessage.includes('data analyst') || lowerMessage.includes('roadmap')) {
      return 'Here\'s your Data Analyst roadmap:\n\n1. Learn Excel & Statistics (2-3 months)\n2. Master SQL for databases (1 month)\n3. Learn Python (NumPy, Pandas) (2 months)\n4. Data Visualization (Tableau/PowerBI) (1 month)\n5. Practice with real datasets\n\nOur "Data Science with Python" course covers steps 3-4 comprehensively!'
    }

    if (lowerMessage.includes('beginner') || lowerMessage.includes('start')) {
      return 'For absolute beginners, I recommend:\n\n1. "Introduction to Programming with Python" - Learn coding basics\n2. "Web Development Fundamentals" - Build your first website\n3. "UI/UX Design Basics" - Understand design principles\n\nAll these courses include hands-on projects and certificates!'
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our courses range from ৳3,500 to ৳8,500. We offer:\n\n- Monthly installment plans\n- Student discounts (20% off)\n- Group enrollment discounts\n- Free trial for first module\n\nContact us for custom pricing!'
    }

    if (lowerMessage.includes('certificate') || lowerMessage.includes('certification')) {
      return 'Yes! All our courses provide industry-recognized certificates upon completion. You\'ll receive:\n\n✓ Digital certificate (PDF)\n✓ LinkedIn shareable badge\n✓ Verified credential\n✓ Lifetime access to course materials\n\nCertificates are issued within 48 hours of course completion!'
    }

    // Default response
    return 'That\'s a great question! Our AI-powered courses cover Web Development, Data Science, Machine Learning, UI/UX Design, and more. Would you like me to recommend a specific course based on your goals? You can also browse our course catalog or contact our support team for personalized guidance.'
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate bot typing
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(input),
        sender: 'bot',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question) => {
    setInput(question)
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Learning Assistant</h1>
          </div>
          <p className="text-gray-600">
            Ask me anything about courses, learning paths, or career guidance
          </p>
        </motion.div>

        {/* Suggested Questions */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-6"
        >
          <p className="text-sm text-gray-500 mb-3 text-center">Suggested questions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedQuestions.map((question, index) => (
              <motion.button
                key={index}
                variants={fadeInUp}
                onClick={() => handleSuggestedQuestion(question)}
                className="p-3 bg-white border border-gray-200 rounded-lg text-left text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition"
              >
                <Sparkles className="w-4 h-4 inline mr-2 text-blue-500" />
                {question}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Chat Card */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Assistant</h2>
                <p className="text-xs text-blue-100">Online • Always here to help</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <motion.div variants={fadeInUp} className="mt-6">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 text-center">
                <Sparkles className="w-4 h-4 inline mr-2 text-purple-600" />
                Powered by advanced AI • Available 24/7 • Multilingual support coming soon
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Chatbot
