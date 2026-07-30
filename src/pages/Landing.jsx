import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
    Users,
    Briefcase,
    Award,
    BookOpen,
    UserCheck,
    Sparkles,
    ArrowRight,
    Star,
    Building2,
    GraduationCap,
    TrendingUp,
    CheckCircle2,
    UserPlus
} from 'lucide-react'
import Footer from '../components/layout/Footer'

// Reusable motion wrapper for scroll animations
function AnimatedSection({ children, className = "", delay = 0 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function Landing() {
    const features = [
        {
            icon: Users,
            title: "Network Building",
            description: "Connect with peers, alumni, and industry professionals from top companies across the globe."
        },
        {
            icon: Briefcase,
            title: "Job Search",
            description: "Discover curated internships and entry-level positions tailored specifically for college students."
        },
        {
            icon: Award,
            title: "Skill Showcase",
            description: "Highlight your academic projects, certifications, and technical skills with verified badges."
        },
        {
            icon: UserCheck,
            title: "Mentorship",
            description: "Get 1-on-1 guidance from experienced seniors and industry experts to accelerate your career."
        },
        {
            icon: BookOpen,
            title: "Knowledge Sharing",
            description: "Share insights, access interview prep material, and participate in technical discussions."
        },
        {
            icon: Sparkles,
            title: "Profile Builder",
            description: "Build an ATS-optimized digital portfolio that stands out to recruiters automatically."
        }
    ]

    const steps = [
        {
            number: "1",
            title: "Create Your Profile",
            description: "Sign up in seconds, add your college details, skills, and academic achievements."
        },
        {
            number: "2",
            title: "Connect & Network",
            description: "Discover classmates, alumni, and recruiters aligned with your career goals."
        },
        {
            number: "3",
            title: "Land Your Dream Job",
            description: "Apply to exclusive student opportunities and get referred by verified insiders."
        }
    ]

    const testimonials = [
        {
            quote: "ProNet helped me connect with an alumnus at Google who referred me for an SDE internship. It changed my career trajectory completely!",
            name: "Rohan Kulkarni",
            college: "IIT Bombay • Computer Science",
            avatar: "https://ui-avatars.com/api/?name=Rohan+Kulkarni&background=0A66C2&color=fff&size=150"
        },
        {
            quote: "Finding quality UI/UX internships used to be overwhelming. On ProNet, I landed 2 offers within my first two weeks of joining.",
            name: "Ananya Iyer",
            college: "NID Ahmedabad • Product Design",
            avatar: "https://ui-avatars.com/api/?name=Ananya+Iyer&background=7C3AED&color=fff&size=150"
        },
        {
            quote: "The mentorship feature is incredible. Connecting with seniors who walked the same path gave me clarity and confidence.",
            name: "Vikramaditya Sen",
            college: "BITS Pilani • Electrical Engineering",
            avatar: "https://ui-avatars.com/api/?name=Vikramaditya+Sen&background=059669&color=fff&size=150"
        }
    ]

    const avatarGroup = [
        "https://ui-avatars.com/api/?name=Aarav+Sharma&background=0A66C2&color=fff",
        "https://ui-avatars.com/api/?name=Diya+Patel&background=7C3AED&color=fff",
        "https://ui-avatars.com/api/?name=Kabir+Singh&background=059669&color=fff",
        "https://ui-avatars.com/api/?name=Neha+Gupta&background=DC2626&color=fff",
        "https://ui-avatars.com/api/?name=Yash+Verma&background=D97706&color=fff"
    ]

    return (
        <div className="min-h-screen bg-[#F3F2EE] text-[#1B1F23] font-sans antialiased overflow-x-hidden selection:bg-[#0A66C2] selection:text-white">

            {/* SECTION 1 - NAVBAR */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-[#0A66C2] text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                            P
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-[#1B1F23]">
                            Pro<span className="text-[#0A66C2]">Net</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-medium text-[#1B1F23] hover:text-[#0A66C2] hover:bg-gray-100 rounded-full transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="px-5 py-2 text-sm font-medium text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-full shadow-sm hover:shadow transition-all"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* SECTION 2 - HERO */}
            <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7 space-y-6 text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A66C2] text-sm font-semibold shadow-xs">
                                <span>🎓 Built for Students</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B1F23] tracking-tight leading-[1.15]">
                                Your Professional <br className="hidden sm:inline" />
                                Journey <span className="text-[#0A66C2]">Starts Here</span>
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
                                Connect with 50,000+ students and professionals. Find internships, build your network, and grow your career — all in one place.
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#0A66C2] hover:bg-[#084e96] rounded-full shadow-md hover:shadow-lg transition-all"
                                >
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="#how-it-works"
                                    className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-[#1B1F23] bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-full shadow-xs transition-all"
                                >
                                    See How It Works
                                </a>
                            </div>

                            {/* Social Proof */}
                            <div className="pt-6 flex items-center gap-4 border-t border-gray-200/80">
                                <div className="flex -space-x-3 overflow-hidden">
                                    {avatarGroup.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt="Student avatar"
                                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white shadow-xs"
                                        />
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 text-amber-500 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Join <span className="font-bold text-[#1B1F23]">50,000+</span> students across India
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column (Floating Card Mockup) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="lg:col-span-5 relative hidden md:block"
                        >
                            <div className="relative mx-auto max-w-md">
                                {/* Background decorative gradient glow */}
                                <div className="absolute -inset-2 bg-gradient-to-tr from-[#0A66C2]/20 to-indigo-500/20 rounded-3xl blur-2xl -z-10"></div>

                                {/* Main Profile Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-5 animate-pulse-slow">
                                    <div className="flex items-start gap-4">
                                        <img
                                            src="https://ui-avatars.com/api/?name=Arjun+Mehta&background=0A66C2&color=fff&size=200"
                                            alt="Arjun Mehta"
                                            className="w-16 h-16 rounded-full ring-4 ring-blue-50 shadow-md"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-bold text-[#1B1F23]">Arjun Mehta</h3>
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Student
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">Final Year CSE Student | Web Developer</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                                <GraduationCap className="w-3.5 h-3.5 text-[#0A66C2]" /> Mumbai University • 487 Connections
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-[#F3F2EE] rounded-xl p-3.5 text-xs text-gray-600 space-y-1.5">
                                        <div className="flex items-center justify-between font-semibold text-gray-800">
                                            <span>Recent Activity</span>
                                            <span className="text-blue-600 text-[11px]">2h ago</span>
                                        </div>
                                        <p className="text-gray-700">"Excited to announce that I've joined TechCorp Solutions as a Frontend Intern! 🚀"</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                                        <span className="text-gray-500 font-medium">Looking for: Full-time SDE roles</span>
                                        <button className="px-3 py-1.5 bg-[#0A66C2] text-white rounded-lg font-medium shadow-xs hover:bg-[#084e96]">
                                            Connect
                                        </button>
                                    </div>
                                </div>

                                {/* Floating Connection Badge Card */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0A66C2] flex items-center justify-center font-bold">
                                        <UserPlus className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1B1F23]">+5 New Connections</p>
                                        <p className="text-xs text-gray-500">From IIT Bombay & Google</p>
                                    </div>
                                </motion.div>

                                {/* Floating Analytics Card */}
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute -top-6 -right-6 bg-white p-3.5 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3"
                                >
                                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-[#1B1F23]">234 Profile Views</p>
                                        <p className="text-[11px] text-emerald-600 font-semibold">+42% this week</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* SECTION 3 - STATS BAR */}
            <section className="bg-gray-100 border-y border-gray-200/80 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-1">
                            <p className="text-3xl sm:text-4xl font-extrabold text-[#0A66C2]">50K+</p>
                            <p className="text-sm font-medium text-gray-600">Active Students</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl sm:text-4xl font-extrabold text-[#0A66C2]">10K+</p>
                            <p className="text-sm font-medium text-gray-600">Partner Companies</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl sm:text-4xl font-extrabold text-[#0A66C2]">25K+</p>
                            <p className="text-sm font-medium text-gray-600">Internships Posted</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl sm:text-4xl font-extrabold text-[#0A66C2]">95%</p>
                            <p className="text-sm font-medium text-gray-600">Placement Success Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 - FEATURES */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1B1F23] tracking-tight">
                            Everything You Need to Grow
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg">
                            Designed specifically for students and early professionals to launch meaningful careers.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon
                            return (
                                <AnimatedSection key={idx} delay={idx * 0.1}>
                                    <div className="h-full bg-white p-8 rounded-xl border border-gray-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
                                        <div>
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0A66C2] flex items-center justify-center mb-6">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#1B1F23] mb-3">{feature.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 5 - HOW IT WORKS */}
            <section id="how-it-works" className="py-20 bg-[#F3F2EE]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1B1F23] tracking-tight">
                            Get Started in 3 Simple Steps
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg">
                            Take control of your career journey in less than 5 minutes.
                        </p>
                    </AnimatedSection>

                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {/* Dashed connector line for desktop */}
                        <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-gray-300 -z-0"></div>

                        {steps.map((step, idx) => (
                            <AnimatedSection key={idx} delay={idx * 0.15} className="relative z-10 text-center">
                                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-full bg-[#0A66C2] text-white font-bold text-xl flex items-center justify-center mb-6 shadow-md">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1B1F23] mb-3">{step.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{step.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 - TESTIMONIALS */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#1B1F23] tracking-tight">
                            Loved by Students Across India
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg">
                            See how ProNet is empowering students from top institutions.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((item, idx) => (
                            <AnimatedSection key={idx} delay={idx * 0.15}>
                                <div className="h-full bg-[#F3F2EE] p-8 rounded-xl border border-gray-200/70 shadow-xs flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-1 text-amber-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-amber-400" />
                                            ))}
                                        </div>
                                        <p className="text-gray-700 italic text-sm leading-relaxed">
                                            "{item.quote}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-300/60">
                                        <img
                                            src={item.avatar}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-full ring-2 ring-white shadow-xs"
                                        />
                                        <div>
                                            <h4 className="text-base font-bold text-[#1B1F23]">{item.name}</h4>
                                            <p className="text-xs text-gray-500 font-medium">{item.college}</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7 - CTA SECTION */}
            <section className="py-20 bg-[#0A66C2] text-white text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
                    <AnimatedSection>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto mt-4">
                            Join 50,000+ students already building their careers on ProNet today.
                        </p>
                        <div className="pt-6">
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-[#0A66C2] bg-white hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all scale-100 hover:scale-105"
                            >
                                Create Free Account
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>

                {/* Subtle background graphic circles */}
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none"></div>
            </section>

            {/* SECTION 8 - FOOTER */}
            <Footer />

        </div>
    )
}
