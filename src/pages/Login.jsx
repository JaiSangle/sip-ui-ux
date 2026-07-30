import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { currentUser } from '../data/mockData'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [shakeKey, setShakeKey] = useState(0)

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setShakeKey(prev => prev + 1)
      return
    }

    setLoading(true)
    setTimeout(() => {
      login(currentUser)
      navigate('/feed')
    }, 1500)
  }

  const hasError = Object.keys(errors).length > 0

  return (
    <div className="flex h-screen">
      {/* Left Column - Hero */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden" style={{ backgroundColor: '#0A66C2' }}>
        <div className="relative z-10 flex flex-col justify-center px-16 lg:px-20 text-white w-full">
          <h1 className="text-5xl font-bold mb-4">ProNet</h1>
          <p className="text-xl text-blue-100 mb-10 max-w-md leading-relaxed">
            Your career starts with the right connections
          </p>

          <div className="space-y-4 mb-16">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">✓</div>
              <span className="text-blue-50 text-lg">Connect with 50,000+ students</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">✓</div>
              <span className="text-blue-50 text-lg">Find internships and jobs</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">✓</div>
              <span className="text-blue-50 text-lg">Learn from professionals</span>
            </div>
          </div>
        </div>

        {/* Floating Stat Cards */}
        <div className="absolute bottom-12 left-16 right-16 flex gap-4">
          <div
            className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-4 text-white border border-white/20"
            style={{ transform: 'rotate(-2deg)' }}
          >
            <p className="text-2xl font-bold">487</p>
            <p className="text-blue-100 text-sm">Connections</p>
          </div>
          <div
            className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-4 text-white border border-white/20"
            style={{ transform: 'rotate(1deg)' }}
          >
            <p className="text-2xl font-bold">12</p>
            <p className="text-blue-100 text-sm">Job Alerts</p>
          </div>
          <div
            className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-4 text-white border border-white/20"
            style={{ transform: 'rotate(-1.5deg)' }}
          >
            <p className="text-2xl font-bold">3</p>
            <p className="text-blue-100 text-sm">New Messages</p>
          </div>
        </div>

        {/* Background decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5"></div>
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-white/5"></div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">ProNet</h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back 👋</h2>
          <p className="text-gray-500 mb-8">Sign in to your ProNet account</p>

          <motion.div
            key={shakeKey}
            animate={{ x: hasError && shakeKey > 0 ? [-10, 10, -10, 10, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })) }}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 h-12 border rounded-lg text-sm outline-none transition-all ${
                      errors.email
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200 focus:border-red-400'
                        : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })) }}
                    placeholder="Enter your password"
                    className={`w-full pl-11 pr-12 h-12 border rounded-lg text-sm outline-none transition-all ${
                      errors.password
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200 focus:border-red-400'
                        : 'border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <span className="text-sm text-gray-500 hover:text-primary cursor-pointer transition-colors">
                  Forgot Password?
                </span>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Button */}
          <button className="w-full h-12 border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3">
            <span className="text-lg font-bold">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </span>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
