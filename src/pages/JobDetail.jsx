import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { jobs as mockJobs, currentUser } from '../data/mockData'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '../components/ui/Badge'
import {
    ArrowLeft,
    MapPin,
    Briefcase,
    DollarSign,
    Users,
    Calendar,
    Bookmark,
    Share2,
    X,
    CheckCircle2,
    Upload,
    Check
} from 'lucide-react'

export default function JobDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    // Find job from mock jobs
    const job = mockJobs.find(j => j.id === id)

    // Local saved state
    const [isSaved, setIsSaved] = useState(job ? job.saved : false)
    const [copiedLink, setCopiedLink] = useState(false)

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [applicantName, setApplicantName] = useState(currentUser?.name || 'Arjun Mehta')
    const [applicantEmail, setApplicantEmail] = useState(currentUser?.email || 'arjun.mehta@email.com')
    const [applicantPhone, setApplicantPhone] = useState('')
    const [resumeName, setResumeName] = useState('Arjun_Mehta_Resume_2024.pdf')
    const [coverLetter, setCoverLetter] = useState('')

    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    if (!job) {
        return (
            <div className="min-h-screen bg-[#F3F2EE] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center border border-gray-200 shadow-sm">
                    <Briefcase size={48} className="mx-auto text-gray-300 mb-3" />
                    <h2 className="text-xl font-bold text-gray-900">Job Not Found</h2>
                    <p className="text-sm text-gray-500 mt-1 mb-6">
                        The opportunity you are looking for might have been closed or removed.
                    </p>
                    <button
                        onClick={() => navigate('/jobs')}
                        className="px-5 py-2.5 bg-[#0A66C2] text-white text-sm font-semibold rounded-lg hover:bg-[#084e96] transition-colors"
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        )
    }

    // Similar jobs (exclude current)
    const similarJobs = mockJobs.filter(j => j.id !== job.id).slice(0, 3)

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
    }

    const handleApplicationSubmit = (e) => {
        e.preventDefault()
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            setSubmitted(true)
        }, 1500)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSubmitted(false)
        setSubmitting(false)
    }

    const getBadgeVariant = (type) => {
        const lower = type.toLowerCase()
        if (lower.includes('intern')) return 'internship'
        if (lower.includes('full')) return 'fulltime'
        if (lower.includes('remote')) return 'remote'
        return 'default'
    }

    // Generated responsibilities based on job title
    const generateResponsibilities = (title) => {
        if (title.toLowerCase().includes('design') || title.toLowerCase().includes('ux')) {
            return [
                "Collaborate with product managers and engineers to execute user-centered designs",
                "Create wireframes, high-fidelity prototypes, and user journey maps for web and mobile",
                "Conduct usability testing and iterate designs based on real feedback",
                "Maintain and extend product design systems and component libraries"
            ]
        }
        if (title.toLowerCase().includes('data') || title.toLowerCase().includes('analyst')) {
            return [
                "Analyze complex datasets to identify trends, patterns, and business opportunities",
                "Develop SQL queries, data pipelines, and automated reporting dashboards",
                "Present data-driven recommendations to cross-functional stakeholders",
                "Partner with product and marketing teams to evaluate A/B test results"
            ]
        }
        return [
            "Collaborate with senior engineers to design, build, and maintain scalable software features",
            "Write clean, efficient, and well-tested code following best development practices",
            "Participate in daily standups, code reviews, and technical architecture discussions",
            "Diagnose and resolve performance bottlenecks across production environments",
            "Document code, API endpoints, and system workflows for team reference"
        ]
    }

    const responsibilities = generateResponsibilities(job.title)

    return (
        <div className="min-h-screen bg-[#F3F2EE] py-6">
            <div className="max-w-5xl mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/jobs')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#0A66C2] mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Jobs
                </button>

                {/* TWO COLUMN CONTAINER */}
                <div className="flex flex-col md:flex-row gap-6 items-start mb-10">

                    {/* LEFT CONTENT (Cards) */}
                    <div className="flex-1 min-w-0 space-y-5 w-full">

                        {/* CARD 1: Header */}
                        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200/80">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex gap-4 items-start">
                                    <img
                                        src={job.logo}
                                        alt={job.company}
                                        className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{job.company}</p>
                                        <h1 className="text-2xl font-bold text-gray-900 mt-0.5">{job.title}</h1>
                                    </div>
                                </div>

                                {/* Save & Share */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleShare}
                                        title="Share Job"
                                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors relative"
                                    >
                                        <Share2 size={18} />
                                        {copiedLink && (
                                            <span className="absolute -bottom-8 right-0 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-xs whitespace-nowrap">
                                                Link copied!
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setIsSaved(!isSaved)}
                                        title={isSaved ? "Saved" : "Save Job"}
                                        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        <Bookmark size={18} className={isSaved ? "text-yellow-500 fill-yellow-500" : ""} />
                                    </button>
                                </div>
                            </div>

                            {/* Meta Row 1: Location, Type, Salary */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap pt-2 border-t border-gray-100">
                                <span className="flex items-center gap-1.5 font-medium">
                                    <MapPin size={16} className="text-gray-400" />
                                    {job.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Briefcase size={16} className="text-gray-400" />
                                    <Badge variant={getBadgeVariant(job.type)} size="md">
                                        {job.type}
                                    </Badge>
                                </span>
                                <span className="flex items-center gap-1.5 font-bold text-emerald-600 ml-auto md:ml-0">
                                    <DollarSign size={16} className="text-emerald-600" />
                                    {job.salary}
                                </span>
                            </div>

                            {/* Meta Row 2: Posted & Applicants */}
                            <div className="flex items-center gap-6 text-xs text-gray-500 pt-2">
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} className="text-gray-400" />
                                    Posted {job.postedDate}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users size={14} className="text-gray-400" />
                                    {job.applicants} total applicants
                                </span>
                            </div>
                        </div>

                        {/* CARD 2: About the Role */}
                        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200/80">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">About this Role</h2>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                {job.description}
                            </p>
                        </div>

                        {/* CARD 3: Requirements */}
                        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200/80">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Requirements</h2>
                            <ul className="space-y-2.5">
                                {job.requirements && job.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                                        <CheckCircle2 size={18} className="text-[#0A66C2] shrink-0 mt-0.5" />
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CARD 4: Responsibilities */}
                        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200/80">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Key Responsibilities</h2>
                            <ul className="space-y-2.5">
                                {responsibilities.map((resp, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                                        <CheckCircle2 size={18} className="text-[#0A66C2] shrink-0 mt-0.5" />
                                        <span>{resp}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CARD 5: About Company */}
                        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200/80">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">About {job.company}</h2>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {job.company} is a pioneer in technology and innovation, focused on delivering impactful products and services worldwide. We foster a collaborative culture where students and early-career professionals can accelerate their career growth through mentorship, ownership, and impactful projects.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT STICKY CARD (Desktop & Mobile) */}
                    <aside className="w-full md:w-80 shrink-0 sticky top-20">
                        <div className="bg-white rounded-xl p-6 shadow-xs border border-gray-200/80 space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Position</p>
                                <h3 className="font-bold text-gray-900 text-lg leading-snug mt-1">{job.title}</h3>
                                <p className="text-xs text-gray-500">{job.company}</p>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <p className="text-xs text-gray-500">Offered Compensation</p>
                                <p className="text-2xl font-extrabold text-emerald-600 mt-0.5">{job.salary}</p>
                            </div>

                            <div className="pt-2 space-y-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full py-3 bg-[#0A66C2] text-white text-sm font-semibold rounded-xl hover:bg-[#084e96] transition-all shadow-sm flex items-center justify-center gap-2"
                                >
                                    Easy Apply
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsSaved(!isSaved)}
                                    className={`w-full py-2.5 border rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${isSaved
                                            ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Bookmark size={16} className={isSaved ? "fill-yellow-500 text-yellow-500" : ""} />
                                    {isSaved ? "Saved" : "Save Job"}
                                </button>
                            </div>

                            <div className="text-center pt-2">
                                <span className="text-xs text-gray-400">⚡ Over {job.applicants} candidates applied</span>
                            </div>
                        </div>
                    </aside>

                </div>

                {/* SIMILAR JOBS SECTION */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Opportunities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {similarJobs.map(sJob => (
                            <div
                                key={sJob.id}
                                onClick={() => navigate(`/jobs/${sJob.id}`)}
                                className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <img src={sJob.logo} alt={sJob.company} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                                        <div>
                                            <h4 className="font-semibold text-sm text-gray-900 hover:text-[#0A66C2] transition-colors">{sJob.title}</h4>
                                            <p className="text-xs text-gray-500">{sJob.company}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-3">
                                        <MapPin size={12} className="text-gray-400" />
                                        <span>{sJob.location}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                    <span className="text-xs font-semibold text-emerald-600">{sJob.salary}</span>
                                    <Badge variant={getBadgeVariant(sJob.type)} size="sm">
                                        {sJob.type}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* APPLICATION MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Apply for {job.title}</h3>
                                    <p className="text-xs text-gray-500">{job.company} • {job.location}</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content / Form */}
                            {submitted ? (
                                /* SUCCESS STATE */
                                <div className="py-8 text-center space-y-4">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                        <Check size={32} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">Application Submitted!</h4>
                                        <p className="text-sm text-gray-500 mt-1.5 max-w-xs mx-auto">
                                            Your profile and resume have been sent to {job.company}. We'll notify you about next steps.
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="mt-4 px-6 py-2.5 bg-[#0A66C2] text-white text-sm font-semibold rounded-xl hover:bg-[#084e96] transition-colors"
                                    >
                                        Done
                                    </button>
                                </div>
                            ) : (
                                /* FORM STATE */
                                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={applicantName}
                                            onChange={(e) => setApplicantName(e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={applicantEmail}
                                            onChange={(e) => setApplicantEmail(e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]"
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={applicantPhone}
                                            onChange={(e) => setApplicantPhone(e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2]"
                                        />
                                    </div>

                                    {/* Resume Upload (UI Mock) */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Upload Resume</label>
                                        <div className="border border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                                            <div className="flex items-center gap-2 text-xs text-gray-600 truncate">
                                                <Upload size={16} className="text-[#0A66C2] shrink-0" />
                                                <span className="truncate font-medium">{resumeName}</span>
                                            </div>
                                            <span className="text-[11px] text-[#0A66C2] font-semibold shrink-0">Change</span>
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        setResumeName(e.target.files[0].name)
                                                    }
                                                }}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    {/* Cover Letter */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1">Cover Letter (Optional)</label>
                                        <textarea
                                            rows={3}
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                            placeholder="Why are you a great fit for this position?"
                                            className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2] resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full py-3 bg-[#0A66C2] text-white text-sm font-semibold rounded-xl hover:bg-[#084e96] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                        >
                                            {submitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    Submitting...
                                                </>
                                            ) : (
                                                "Submit Application"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
