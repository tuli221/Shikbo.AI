import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { loginSchema } from '@/utils/validationSchemas'
import { authAPI } from '@/utils/api'
import { setUser } from '@/store/slices/userSlice'
import { fadeInUp } from '@/utils/animations'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await authAPI.login(data)
      
      // Store token and user data
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('userRole', response.user.role)
      
      dispatch(setUser(response.user))
      
      toast.success('Login successful!')
      
      // Redirect based on role
      switch (response.user.role) {
        case 'student':
          navigate('/student-dashboard')
          break
        case 'instructor':
          navigate('/instructor-dashboard')
          break
        case 'admin':
          navigate('/admin-dashboard')
          break
        default:
          navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    toast.info('Google login coming soon!')
    // Implement Google OAuth here
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="p-4 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <Link to="/">
            <img src="/Shikbo.AI.png" alt="Shikhbo.AI Logo" className="h-10" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 bg-white">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="w-full max-w-md"
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Login to your account
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...register('password')}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-600 hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-600 text-white"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Google Login */}
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100"
              >
                <FcGoogle className="w-5 h-5" />
                <span className="font-medium">Continue with Google</span>
              </Button>

              {/* Sign Up Link */}
              <div className="mt-6 text-center text-sm text-black">
                Don't have an account?{' '}
                <Link to="/register" className="text-green-600 hover:underline font-semibold">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default Login
