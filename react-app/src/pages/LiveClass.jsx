import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  Hand,
  MessageSquare,
  Users,
  Settings,
  PhoneOff,
  Send,
  MoreVertical,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { fadeInUp } from '@/utils/animations'

const LiveClass = () => {
  const { classId } = useParams()
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [handRaised, setHandRaised] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [showParticipants, setShowParticipants] = useState(true)
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Instructor',
      message: 'Welcome to today\'s live session on React Hooks!',
      time: '10:00 AM',
      isInstructor: true,
    },
    {
      id: 2,
      sender: 'Ahmed Shakil',
      message: 'Good morning everyone!',
      time: '10:01 AM',
      isInstructor: false,
    },
  ])

  const chatEndRef = useRef(null)

  const classInfo = {
    title: 'React Hooks Deep Dive',
    instructor: 'Ahmed Shakil',
    duration: '2 hours',
    startTime: '10:00 AM',
  }

  const participants = [
    { id: 1, name: 'Ahmed Shakil', role: 'Instructor', video: true, audio: true },
    { id: 2, name: 'You', role: 'Student', video: isVideoOn, audio: !isMuted },
    { id: 3, name: 'Rahul Ahmed', role: 'Student', video: true, audio: false },
    { id: 4, name: 'Fatima Khan', role: 'Student', video: true, audio: true },
    { id: 5, name: 'Tanvir Hasan', role: 'Student', video: false, audio: true },
    { id: 6, name: 'Nusrat Jahan', role: 'Student', video: true, audio: false },
  ]

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'You',
      message: chatMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isInstructor: false,
    }

    setChatMessages([...chatMessages, newMessage])
    setChatMessage('')
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/student-dashboard" className="text-gray-300 hover:text-white">
              <PhoneOff className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-white font-bold">{classInfo.title}</h1>
              <p className="text-gray-400 text-sm">
                Instructor: {classInfo.instructor} • {classInfo.startTime}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
            <Button variant="ghost" size="sm" className="text-white">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {/* Instructor Video - Large */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="md:col-span-2 lg:col-span-2 lg:row-span-2"
            >
              <Card className="h-full bg-gray-800 border-gray-700">
                <CardContent className="p-0 h-full relative">
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center rounded-lg">
                    {isScreenSharing ? (
                      <div className="text-center text-white">
                        <Monitor className="w-20 h-20 mx-auto mb-4" />
                        <p className="text-xl font-bold">Screen Sharing</p>
                        <p className="text-gray-300 text-sm">Instructor is sharing screen</p>
                      </div>
                    ) : (
                      <div className="text-center text-white">
                        <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-5xl font-bold mb-4">
                          AS
                        </div>
                        <p className="text-2xl font-bold">{classInfo.instructor}</p>
                        <p className="text-gray-300">Instructor</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                    {classInfo.instructor}
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <div className="bg-green-600 rounded-full p-2">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-blue-600 rounded-full p-2">
                      <Video className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Student Videos */}
            {participants.slice(1, 7).map((participant, index) => (
              <motion.div
                key={participant.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-48 bg-gray-800 border-gray-700">
                  <CardContent className="p-0 h-full relative">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center rounded-lg">
                      {participant.video ? (
                        <div className="text-center text-white">
                          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mb-2">
                            {participant.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <p className="text-sm font-semibold">{participant.name}</p>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">
                          <VideoOff className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">{participant.name}</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      {participant.name}
                    </div>
                    <div className="absolute bottom-2 right-2">
                      {participant.audio ? (
                        <div className="bg-green-600 rounded-full p-1">
                          <Mic className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="bg-red-600 rounded-full p-1">
                          <MicOff className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Chat & Participants */}
        {(showChat || showParticipants) && (
          <aside className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => {
                  setShowChat(true)
                  setShowParticipants(false)
                }}
                className={`flex-1 px-4 py-3 text-sm font-semibold ${
                  showChat ? 'text-white bg-gray-700' : 'text-gray-400'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => {
                  setShowChat(false)
                  setShowParticipants(true)
                }}
                className={`flex-1 px-4 py-3 text-sm font-semibold ${
                  showParticipants ? 'text-white bg-gray-700' : 'text-gray-400'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Participants ({participants.length})
              </button>
            </div>

            {/* Chat */}
            {showChat && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            msg.isInstructor ? 'text-yellow-400' : 'text-blue-400'
                          }`}
                        >
                          {msg.sender}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-300">{msg.message}</p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-3 border-t border-gray-700">
                  <div className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                    <Button onClick={handleSendMessage} size="sm" className="bg-blue-600">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Participants */}
            {showParticipants && (
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-2 bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {participant.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{participant.name}</p>
                        <p className="text-xs text-gray-400">{participant.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {participant.audio ? (
                        <Mic className="w-4 h-4 text-green-400" />
                      ) : (
                        <MicOff className="w-4 h-4 text-red-400" />
                      )}
                      {participant.video ? (
                        <Video className="w-4 h-4 text-green-400" />
                      ) : (
                        <VideoOff className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => setIsMuted(!isMuted)}
            variant={isMuted ? 'destructive' : 'default'}
            className={`rounded-full w-12 h-12 ${
              isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>

          <Button
            onClick={() => setIsVideoOn(!isVideoOn)}
            variant={!isVideoOn ? 'destructive' : 'default'}
            className={`rounded-full w-12 h-12 ${
              !isVideoOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          <Button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`rounded-full w-12 h-12 ${
              isScreenSharing
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            {isScreenSharing ? (
              <MonitorOff className="w-5 h-5" />
            ) : (
              <Monitor className="w-5 h-5" />
            )}
          </Button>

          <Button
            onClick={() => setHandRaised(!handRaised)}
            className={`rounded-full w-12 h-12 ${
              handRaised ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <Hand className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => setShowChat(!showChat)}
            className="rounded-full w-12 h-12 bg-gray-600 hover:bg-gray-700"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => setShowParticipants(!showParticipants)}
            className="rounded-full w-12 h-12 bg-gray-600 hover:bg-gray-700"
          >
            <Users className="w-5 h-5" />
          </Button>

          <Button variant="destructive" className="rounded-full w-12 h-12 bg-red-600">
            <PhoneOff className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LiveClass
