import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Code, 
  Robot, 
  Wrench, 
  GraduationCap, 
  Award,
  ArrowRight,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations'

const Landing = () => {
  const features = [
    {
      id: 1,
      icon: <Code className="w-6 h-6 text-white" />,
      title: 'Web Development',
      description: 'HTML, CSS, JavaScript, React, Node.js',
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      id: 2,
      icon: <Robot className="w-6 h-6 text-white" />,
      title: 'AI-Powered Learning',
      description: 'Get personalized course recommendations and instant help from our AI assistant',
      gradient: 'from-purple-500 to-pink-400',
      badge: 'AI',
    },
    {
      id: 3,
      icon: <Wrench className="w-6 h-6 text-white" />,
      title: 'Practical Projects',
      description: 'Build real-world projects that showcase your skills to potential employers',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      id: 4,
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of practical experience',
      gradient: 'from-orange-500 to-red-400',
    },
    {
      id: 5,
      icon: <Award className="w-6 h-6 text-white" />,
      title: 'Industry Certificates',
      description: 'Earn recognized certificates that boost your career prospects',
      gradient: 'from-green-500 to-emerald-400',
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Rafi Ahmed',
      role: 'Software Engineer, Dhaka',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      text: 'Shikhbo.AI helped me land my dream job! The courses are practical and the instructors are amazing.',
    },
    {
      id: 2,
      name: 'Nusrat Jahan',
      role: 'Web Developer, Chittagong',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'The AI-powered learning assistant made studying so much easier. Highly recommended!',
    },
    {
      id: 3,
      name: 'Tanvir Hasan',
      role: 'Data Analyst, Sylhet',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'Best platform for learning tech skills. The projects helped me build a strong portfolio.',
    },
  ]

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-emerald-950 to-emerald-950">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-6"
            variants={fadeInUp}
          >
            Learn Tech with AI
          </motion.h2>
          <motion.p className="text-lg text-white mb-8 max-w-3xl mx-auto" variants={fadeInUp}>
            Empower your future with personalized tech education. Get AI-powered course
            recommendations, expert guidance, and practical skills that lead to real careers.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" variants={fadeInUp}>
            <Link to="/courses">
              <Button size="lg" className="bg-primary text-white hover:bg-secondary">
                Get Started
              </Button>
            </Link>
            <Link to="/courses">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-white hover:bg-primary"
              >
                Explore Courses
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Shikhbo.AI?
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature) => (
              <motion.div key={feature.id} variants={staggerItem}>
                <Card className="bg-black/80 border border-gray-700 hover:border-green-500 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-left">
                    <div className="relative mb-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 bg-gradient-to-tr ${feature.gradient} rounded-xl`}
                      >
                        {feature.icon}
                      </div>
                      {feature.badge && (
                        <span className="absolute -top-2 -right-2 bg-white text-[10px] font-bold text-black px-1.5 py-0.5 rounded-md">
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-extrabold mb-4 text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                    {feature.id === 1 && (
                      <Link
                        to="/courses"
                        className="text-green-400 font-semibold hover:underline flex items-center gap-2"
                      >
                        Explore Path <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black/80 backdrop-blur-md rounded-2xl shadow-lg m-10 p-10 flex flex-col md:flex-row items-center justify-between md:space-x-10 space-y-6 md:space-y-0">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Learning Journey?
          </motion.h2>
          <motion.p
            className="text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of students already learning on Shikhbo.AI
          </motion.p>
          <Link to="/register">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
              Sign Up Now - It's Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 md:px-16 bg-gradient-to-b from-[#0a1e14] to-[#061b11]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Our Students Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800 border-gray-700 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full border border-green-400"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-[#0a1e14] to-[#061b11]">
        <div className="max-w-7xl mx-auto px-4">
          <nav>
            <ul className="flex items-center justify-center gap-6 text-white text-sm md:text-base flex-wrap py-2">
              <li className="font-semibold pr-4 border-r border-white/20">Quick Links</li>
              <li>
                <Link to="/about" className="hover:text-gray-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-gray-200">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="hover:text-gray-200">
                  Instructor
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-gray-200">
                  Success Story
                </Link>
              </li>
              <li>
                <Link to="/career-support" className="hover:text-gray-200">
                  Career Support
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  )
}

export default Landing
