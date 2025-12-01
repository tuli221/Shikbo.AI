import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreditCard, Smartphone, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { paymentSchema } from '@/utils/validationSchemas'
import { toast } from 'react-toastify'
import { fadeInUp } from '@/utils/animations'

const Payment = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [selectedMethod, setSelectedMethod] = useState('bkash')
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      method: 'bkash',
      amount: 6500,
    },
  })

  const course = {
    title: 'React & Laravel Full Stack Development',
    price: 6500,
  }

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', logo: '/Bkash.webp' },
    { id: 'nagad', name: 'Nagad', logo: '' },
    { id: 'card', name: 'Credit/Debit Card', logo: '' },
  ]

  const onSubmit = async (data) => {
    try {
      // Simulate payment processing
      toast.info('Processing payment...')
      
      setTimeout(() => {
        setPaymentSuccess(true)
        toast.success('Payment successful!')
        
        setTimeout(() => {
          navigate('/student-dashboard')
        }, 3000)
      }, 2000)
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    }
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            You have successfully enrolled in {course.title}
          </p>
          <p className="text-gray-500 text-sm">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-[#f5f5f5] border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/">
            <img src="/Shikbo.AI.png" alt="Shikhbo.AI" className="h-10" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-green-600">
              Courses
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          className="text-center mb-10"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Complete Your Payment</h1>
          <p className="text-gray-600">Choose your preferred payment method</p>
        </motion.div>

        {/* Payment Methods */}
        <div className="text-center mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`px-8 py-3 rounded-lg flex items-center gap-3 font-semibold transition ${
                  selectedMethod === method.id
                    ? 'bg-[#e2136e] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {method.id === 'bkash' && method.logo && (
                  <img src={method.logo} alt={method.name} className="w-10" />
                )}
                {method.id === 'card' && <CreditCard className="w-5 h-5" />}
                {method.id === 'nagad' && <Smartphone className="w-5 h-5" />}
                {method.name}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Card */}
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-semibold">{course.title}</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold text-green-600">
                  <span>Total Amount:</span>
                  <span>৳{course.price.toLocaleString()}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {(selectedMethod === 'bkash' || selectedMethod === 'nagad') && (
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      {...register('phoneNumber')}
                      className={errors.phoneNumber ? 'border-red-500' : ''}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                )}

                {selectedMethod === 'card' && (
                  <>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" type="text" placeholder="MM/YY" maxLength="5" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" type="text" placeholder="123" maxLength="3" />
                      </div>
                    </div>
                  </>
                )}

                <input type="hidden" {...register('amount')} value={course.price} />
                <input type="hidden" {...register('method')} value={selectedMethod} />

                <Button
                  type="submit"
                  className="w-full bg-[#e2136e] hover:bg-[#c90f61] text-white py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-3"
                >
                  {selectedMethod === 'bkash' && (
                    <img src="/Bkash.webp" className="w-12" alt="bKash" />
                  )}
                  Pay ৳{course.price.toLocaleString()}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact & Info Section */}
        <section className="max-w-7xl mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-green-600" />
                    <a href="tel:+8801710070606" className="hover:text-green-600">
                      +880 1710-070606
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-green-600" />
                    <a href="mailto:support@shikhbo.ai" className="hover:text-green-600">
                      support@shikhbo.ai
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Follow Us */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/8801710070606"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b0b0b] text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">© 2025 Shikhbo.AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Payment
