import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { currentUser } from '../data/mockData'
import {
    ChevronRight,
    ChevronLeft,
    Check,
    Eye,
    EyeOff,
    User,
    Mail,
    Lock,
    GraduationCap,
    BookOpen,
    Briefcase,
    Globe
} from 'lucide-react'

const INTEREST_TAGS = [
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Digital Marketing",
    "Finance",
    "Consulting",
    "AI/ML",
    "Product Management",
    "Cybersecurity",
    "Content Writing",
    "Entrepreneurship",
    "Research"
]

export default function Signup() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    // Step 1 State
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Step 2 State
    const [university, setUniversity] = useState('')
    const [fieldOfStudy, setFieldOfStudy] = useState('')
    const [gradYear, setGradYear] = useState('')
    const [currentStatus, setCurrentStatus] = useState('')
    const [linkedinUrl, setLinkedinUrl] = useState('')

    // Step 3 State
    const [selectedInterests, setSelectedInterests] = useState([])
    const [headline, setHeadline] = useState('')
    const [bio, setBio] = useState('')

    // Password strength calculation
    const getPasswordStrength = (pass) => {
        if (!pass) return { score: 0, label: '', color: 'bg-gray-200' }
        let score = 0
        if (pass.length >= 8) score += 1
        if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1
        if (/[^A-Za-z0-9]/.test(pass) && pass.length >= 8) score += 1

        if (pass.length < 6) {
            return { score: 1, label: 'Weak', color: 'bg-red-500', text: 'text-red-500' }
        }
        if (score <= 1) {
            return { score: 1, label: 'Weak', color: 'bg-red-500', text: 'text-red-500' }
        }
        if (score === 2) {
            return { score: 2, label: 'Medium', color: 'bg-yellow-500', text: 'text-yellow-600' }
        }
        return { score: 3, label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' }
    }

    const pwdStrength = getPasswordStrength(password)

    // Step Validation
    const validateStep1 = () => {
        const newErrors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!fullName.trim()) newErrors.fullName = 'Full Name is required'
        if (!email.trim()) {
            newErrors.email = 'Email address is required'
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!password) {
            newErrors.password = 'Password is required'
        } else if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        return newErrors
    }

    const validateStep2 = () => {
        const newErrors = {}
        if (!university.trim()) newErrors.university = 'University Name is required'
        if (!fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required'
        if (!gradYear) newErrors.gradYear = 'Graduation Year is required'
        if (!currentStatus) newErrors.currentStatus = 'Current Status is required'
        return newErrors
    }

    const validateStep3 = () => {
        const newErrors = {}
        if (selectedInterests.length < 3) {
            newErrors.interests = 'Please select at least 3 areas of interest'
        }
        if (!headline.trim()) {
            newErrors.headline = 'Profile headline is required'
        }
        return newErrors
    }

    const handleNext = () => {
        let currentErrors = {}
        if (step === 1) currentErrors = validateStep1()
        else if (step === 2) currentErrors = validateStep2()

        setErrors(currentErrors)
        if (Object.keys(currentErrors).length === 0) {
            setStep(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        setErrors({})
        setStep(prev => prev - 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const currentErrors = validateStep3()
        setErrors(currentErrors)

        if (Object.keys(currentErrors).length > 0) return

        setLoading(true)
        setTimeout(() => {
            login(currentUser)
            navigate('/feed')
        }, 1500)
    }

    const toggleInterest = (tag) => {
        setSelectedInterests(prev => {
            const exists = prev.includes(tag)
            const updated = exists ? prev.filter(item => item !== tag) : [...prev, tag]
            if (updated.length >= 3) {
                setErrors(err => ({ ...err, interests: undefined }))
            }
            return updated
        })
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* LEFT COLUMN - Dynamic Hero Panel */}
            <div className="hidden md:flex w-1/2 relative overflow-hidden bg-[#0A66C2] text-white">
                <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 w-full">
                    {/* Logo */}
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
                            <div className="w-8 h-8 rounded-lg bg-white text-[#0A66C2] flex items-center justify-center font-extrabold text-xl">
                                P
                            </div>
                            ProNet
                        </Link>
                    </div>

                    {/* Dynamic Content Per Step */}
                    <div className="space-y-6 max-w-md my-auto">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1-hero"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-4"
                                >
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wide uppercase">
                                        Step 1 of 3
                                    </span>
                                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                                        Join 50,000+ <br />students today
                                    </h1>
                                    <p className="text-blue-100 text-lg leading-relaxed">
                                        Start building your professional network, showcasing your skills, and getting discovered by top recruiters.
                                    </p>
                                    <div className="pt-4 space-y-3">
                                        <div className="flex items-center gap-3 text-blue-50 text-sm font-medium">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                            Free account for all students & alumni
                                        </div>
                                        <div className="flex items-center gap-3 text-blue-50 text-sm font-medium">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                            Access to 25K+ verified internships
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2-hero"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-4"
                                >
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wide uppercase">
                                        Step 2 of 3
                                    </span>
                                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                                        Build your professional profile
                                    </h1>
                                    <p className="text-blue-100 text-lg leading-relaxed">
                                        Let recruiters and campus peers know your university background, field of study, and current career status.
                                    </p>
                                    <div className="pt-4 space-y-3">
                                        <div className="flex items-center gap-3 text-blue-50 text-sm font-medium">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                            Showcase college affiliations
                                        </div>
                                        <div className="flex items-center gap-3 text-blue-50 text-sm font-medium">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                            Get matched with relevant alumni
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3-hero"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-4"
                                >
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold tracking-wide uppercase">
                                        Step 3 of 3
                                    </span>
                                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                                        Discover your opportunities
                                    </h1>
                                    <p className="text-blue-100 text-lg leading-relaxed">
                                        Tailor your feed, job recommendations, and peer connections according to your unique career interests.
                                    </p>
                                    <div className="pt-4 space-y-3">
                                        <div className="flex items-center gap-3 text-blue-50 text-sm font-medium">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                            Personalized job feed & notifications
                                        </div>
                                        <div className="flex items-center gap-3 text-blue-50 text-sm font-medium">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                            Connect with like-minded students
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Text */}
                    <p className="text-xs text-blue-200">
                        © 2024 ProNet Inc. All rights reserved.
                    </p>
                </div>

                {/* Decorative Background Graphics */}
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none"></div>
            </div>

            {/* RIGHT COLUMN - Form & Multi-Step Wizard */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white">
                <div className="w-full max-w-md my-auto">
                    {/* Mobile Header */}
                    <div className="md:hidden text-center mb-6">
                        <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-[#0A66C2]">
                            <div className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center font-bold text-lg">
                                P
                            </div>
                            ProNet
                        </Link>
                    </div>

                    {/* PROGRESS INDICATOR BAR */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between relative mb-2">
                            {/* Connecting line */}
                            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-gray-200 -z-0">
                                <div
                                    className="h-full bg-[#0A66C2] transition-all duration-300"
                                    style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                                ></div>
                            </div>

                            {/* Step 1 Dot */}
                            <div className="relative z-10 bg-white px-1">
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > 1
                                        ? 'bg-[#0A66C2] text-white'
                                        : step === 1
                                            ? 'bg-[#0A66C2] text-white ring-4 ring-blue-100'
                                            : 'bg-gray-100 text-gray-400 border border-gray-300'
                                        }`}
                                >
                                    {step > 1 ? <Check className="w-5 h-5" /> : '1'}
                                </div>
                            </div>

                            {/* Step 2 Dot */}
                            <div className="relative z-10 bg-white px-1">
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > 2
                                        ? 'bg-[#0A66C2] text-white'
                                        : step === 2
                                            ? 'bg-[#0A66C2] text-white ring-4 ring-blue-100'
                                            : 'bg-gray-100 text-gray-400 border border-gray-300'
                                        }`}
                                >
                                    {step > 2 ? <Check className="w-5 h-5" /> : '2'}
                                </div>
                            </div>

                            {/* Step 3 Dot */}
                            <div className="relative z-10 bg-white px-1">
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step === 3
                                        ? 'bg-[#0A66C2] text-white ring-4 ring-blue-100'
                                        : 'bg-gray-100 text-gray-400 border border-gray-300'
                                        }`}
                                >
                                    3
                                </div>
                            </div>
                        </div>

                        {/* Step Labels */}
                        <div className="flex justify-between text-xs font-semibold text-gray-500 px-1">
                            <span className={step === 1 ? 'text-[#0A66C2]' : ''}>Basic Info</span>
                            <span className={step === 2 ? 'text-[#0A66C2]' : ''}>Professional Info</span>
                            <span className={step === 3 ? 'text-[#0A66C2]' : ''}>Interests</span>
                        </div>
                    </div>

                    {/* STEP FORM WRAPPER */}
                    <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext() }}>
                        <AnimatePresence mode="wait">

                            {/* STEP 1: Basic Info */}
                            {step === 1 && (
                                <motion.div
                                    key="step1-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                                        <p className="text-sm text-gray-500 mt-1">Enter your personal credentials to get started</p>
                                    </div>

                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                                        <div className="relative">
                                            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: undefined })) }}
                                                placeholder="Arjun Mehta"
                                                className={`w-full pl-10 pr-4 h-11 border rounded-lg text-sm outline-none transition-all ${errors.fullName ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]'
                                                    }`}
                                            />
                                        </div>
                                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })) }}
                                                placeholder="arjun@example.com"
                                                className={`w-full pl-10 pr-4 h-11 border rounded-lg text-sm outline-none transition-all ${errors.email ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]'
                                                    }`}
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                                        <div className="relative">
                                            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })) }}
                                                placeholder="At least 8 characters"
                                                className={`w-full pl-10 pr-10 h-11 border rounded-lg text-sm outline-none transition-all ${errors.password ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]'
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        {/* Password Strength Meter */}
                                        {password && (
                                            <div className="mt-2 space-y-1">
                                                <div className="flex gap-1 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full transition-all duration-300 ${pwdStrength.score >= 1 ? pwdStrength.color : 'bg-transparent'}`} style={{ width: '33.33%' }}></div>
                                                    <div className={`h-full transition-all duration-300 ${pwdStrength.score >= 2 ? pwdStrength.color : 'bg-transparent'}`} style={{ width: '33.33%' }}></div>
                                                    <div className={`h-full transition-all duration-300 ${pwdStrength.score >= 3 ? pwdStrength.color : 'bg-transparent'}`} style={{ width: '33.33%' }}></div>
                                                </div>
                                                <div className="flex justify-between items-center text-[11px]">
                                                    <span className="text-gray-400">Password strength:</span>
                                                    <span className={`font-semibold ${pwdStrength.text}`}>{pwdStrength.label}</span>
                                                </div>
                                            </div>
                                        )}
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
                                        <div className="relative">
                                            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: undefined })) }}
                                                placeholder="Re-enter password"
                                                className={`w-full pl-10 pr-10 h-11 border rounded-lg text-sm outline-none transition-all ${errors.confirmPassword ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]'
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: Professional Info */}
                            {step === 2 && (
                                <motion.div
                                    key="step2-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Academic Background</h2>
                                        <p className="text-sm text-gray-500 mt-1">Tell us about your education and status</p>
                                    </div>

                                    {/* University */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">University / College Name</label>
                                        <div className="relative">
                                            <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={university}
                                                onChange={(e) => { setUniversity(e.target.value); setErrors(prev => ({ ...prev, university: undefined })) }}
                                                placeholder="e.g. Mumbai University, IIT Bombay"
                                                className={`w-full pl-10 pr-4 h-11 border rounded-lg text-sm outline-none transition-all ${errors.university ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]'
                                                    }`}
                                            />
                                        </div>
                                        {errors.university && <p className="text-red-500 text-xs mt-1">{errors.university}</p>}
                                    </div>

                                    {/* Field of Study */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Field of Study</label>
                                        <div className="relative">
                                            <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <select
                                                value={fieldOfStudy}
                                                onChange={(e) => { setFieldOfStudy(e.target.value); setErrors(prev => ({ ...prev, fieldOfStudy: undefined })) }}
                                                className={`w-full pl-10 pr-4 h-11 border rounded-lg text-sm outline-none bg-white transition-all appearance-none cursor-pointer ${errors.fieldOfStudy ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]'
                                                    }`}
                                            >
                                                <option value="">Select your field</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Data Science">Data Science</option>
                                                <option value="Design">Design</option>
                                                <option value="Business">Business</option>
                                                <option value="Marketing">Marketing</option>
                                                <option value="Finance">Finance</option>
                                                <option value="Engineering">Engineering</option>
                                                <option value="Law">Law</option>
                                                <option value="Medicine">Medicine</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        {errors.fieldOfStudy && <p className="text-red-500 text-xs mt-1">{errors.fieldOfStudy}</p>}
                                    </div>

                                    {/* Graduation Year */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Graduation Year</label>
                                        <select
                                            value={gradYear}
                                            onChange={(e) => { setGradYear(e.target.value); setErrors(prev => ({ ...prev, gradYear: undefined })) }}
                                            className={`w-full px-3.5 h-11 border rounded-lg text-sm outline-none bg-white transition-all appearance-none cursor-pointer ${errors.gradYear ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]'
                                                }`}
                                        >
                                            <option value="">Select expected graduation year</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                        </select>
                                        {errors.gradYear && <p className="text-red-500 text-xs mt-1">{errors.gradYear}</p>}
                                    </div>

                                    {/* Current Status */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Current Status</label>
                                        <div className="relative">
                                            <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            <select
                                                value={currentStatus}
                                                onChange={(e) => { setCurrentStatus(e.target.value); setErrors(prev => ({ ...prev, currentStatus: undefined })) }}
                                                className={`w-full pl-10 pr-4 h-11 border rounded-lg text-sm outline-none bg-white transition-all appearance-none cursor-pointer ${errors.currentStatus ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]'
                                                    }`}
                                            >
                                                <option value="">Select your status</option>
                                                <option value="Student">Student</option>
                                                <option value="Recent Graduate">Recent Graduate</option>
                                                <option value="Working Professional">Working Professional</option>
                                            </select>
                                        </div>
                                        {errors.currentStatus && <p className="text-red-500 text-xs mt-1">{errors.currentStatus}</p>}
                                    </div>

                                    {/* LinkedIn URL (Optional) */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">LinkedIn URL (Optional)</label>
                                        <div className="relative">
                                            <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="url"
                                                value={linkedinUrl}
                                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                                placeholder="https://linkedin.com/in/username"
                                                className="w-full pl-10 pr-4 h-11 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2] transition-all"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: Interests & Bio */}
                            {step === 3 && (
                                <motion.div
                                    key="step3-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Customize your feed</h2>
                                        <p className="text-sm text-gray-500 mt-1">Select areas of interest (choose at least 3)</p>
                                    </div>

                                    {/* Tags Flex Wrap */}
                                    <div>
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {INTEREST_TAGS.map((tag) => {
                                                const isSelected = selectedInterests.includes(tag)
                                                return (
                                                    <button
                                                        key={tag}
                                                        type="button"
                                                        onClick={() => toggleInterest(tag)}
                                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${isSelected
                                                            ? 'bg-[#0A66C2] text-white shadow-xs scale-105'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                                            }`}
                                                    >
                                                        {isSelected ? '✓ ' : '+ '}
                                                        {tag}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        {errors.interests && <p className="text-red-500 text-xs mt-1.5">{errors.interests}</p>}
                                    </div>

                                    {/* Headline */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Profile Headline</label>
                                        <input
                                            type="text"
                                            value={headline}
                                            onChange={(e) => { setHeadline(e.target.value); setErrors(prev => ({ ...prev, headline: undefined })) }}
                                            placeholder="e.g. Final Year CSE Student | Web Developer"
                                            className={`w-full px-3.5 h-11 border rounded-lg text-sm outline-none transition-all ${errors.headline ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]'
                                                }`}
                                        />
                                        {errors.headline && <p className="text-red-500 text-xs mt-1">{errors.headline}</p>}
                                    </div>

                                    {/* Bio Textarea */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="block text-xs font-semibold text-gray-700">Bio (Optional)</label>
                                            <span className="text-[11px] text-gray-400">{bio.length}/200</span>
                                        </div>
                                        <textarea
                                            maxLength={200}
                                            rows={3}
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Briefly introduce yourself, your goals, or what you're passionate about..."
                                            className="w-full p-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2] transition-all resize-none"
                                        ></textarea>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* NAVIGATION BUTTONS */}
                        <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-gray-100">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </button>
                            ) : (
                                <div />
                            )}

                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-6 py-2.5 bg-[#0A66C2] text-white rounded-lg text-sm font-semibold hover:bg-[#084e96] flex items-center gap-1.5 shadow-sm transition-all ml-auto"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-7 py-2.5 bg-[#0A66C2] text-white rounded-lg text-sm font-semibold hover:bg-[#084e96] flex items-center gap-2 shadow-md transition-all ml-auto disabled:opacity-70"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <Check className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>

                    {/* SIGN IN FOOTER LINK */}
                    <p className="text-center text-xs text-gray-500 mt-6">
                        Already have a ProNet account?{' '}
                        <Link to="/login" className="text-[#0A66C2] font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
