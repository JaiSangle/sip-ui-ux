import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jobs as mockJobs } from '../data/mockData'
import Badge from '../components/ui/Badge'
import {
    Search,
    Briefcase,
    MapPin,
    Clock,
    Users,
    Bookmark,
    Filter,
    ChevronDown,
    X
} from 'lucide-react'

export default function Jobs() {
    const navigate = useNavigate()

    // Jobs state for bookmark toggling
    const [jobList, setJobList] = useState(mockJobs)

    // Filter States
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTypes, setSelectedTypes] = useState([])
    const [locationQuery, setLocationQuery] = useState('')
    const [sortBy, setSortBy] = useState('Most Relevant')

    // Applied Filters State (Active filter parameters)
    const [appliedSearch, setAppliedSearch] = useState('')
    const [appliedTypes, setAppliedTypes] = useState([])
    const [appliedLocation, setAppliedLocation] = useState('')
    const [appliedSort, setAppliedSort] = useState('Most Relevant')

    // Mobile Filter Modal State
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

    // Toggle Type Checkbox
    const handleTypeToggle = (type) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    // Apply Filters Action
    const handleApplyFilters = () => {
        setAppliedSearch(searchQuery)
        setAppliedTypes(selectedTypes)
        setAppliedLocation(locationQuery)
        setAppliedSort(sortBy)
        setMobileFilterOpen(false)
    }

    // Clear All Filters
    const handleClearFilters = () => {
        setSearchQuery('')
        setSelectedTypes([])
        setLocationQuery('')
        setSortBy('Most Relevant')
        setAppliedSearch('')
        setAppliedTypes([])
        setAppliedLocation('')
        setAppliedSort('Most Relevant')
    }

    // Bookmark Toggle
    const toggleSaveJob = (e, id) => {
        e.stopPropagation()
        setJobList(prev =>
            prev.map(j => (j.id === id ? { ...j, saved: !j.saved } : j))
        )
    }

    // Filtered and Sorted Jobs Computation
    const filteredJobs = jobList.filter(job => {
        // Search query match (title or company)
        const matchesSearch =
            !appliedSearch ||
            job.title.toLowerCase().includes(appliedSearch.toLowerCase()) ||
            job.company.toLowerCase().includes(appliedSearch.toLowerCase())

        // Location query match
        const matchesLocation =
            !appliedLocation ||
            job.location.toLowerCase().includes(appliedLocation.toLowerCase())

        // Job Type match
        const matchesType =
            appliedTypes.length === 0 ||
            appliedTypes.some(type => {
                if (type === 'Remote') return job.location.toLowerCase().includes('remote') || job.type.toLowerCase().includes('remote')
                return job.type.toLowerCase() === type.toLowerCase()
            })

        return matchesSearch && matchesLocation && matchesType
    })

    // Sort logic
    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (appliedSort === 'Highest Salary') {
            const getSalaryVal = (s) => parseInt(s.replace(/[^0-9]/g, '')) || 0
            return getSalaryVal(b.salary) - getSalaryVal(a.salary)
        }
        // Most Recent default fallback
        return a.id.localeCompare(b.id)
    })

    const getBadgeVariant = (type) => {
        const lower = type.toLowerCase()
        if (lower.includes('intern')) return 'internship'
        if (lower.includes('full')) return 'fulltime'
        if (lower.includes('remote')) return 'remote'
        return 'default'
    }

    return (
        <div className="min-h-screen bg-[#F3F2EE] py-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Explore Internships & Opportunities</h1>
                    <p className="text-sm text-gray-500 mt-1">Discover roles matched to your academic background and skills</p>
                </div>

                <div className="flex gap-6">
                    {/* LEFT FILTERS PANEL (Desktop) */}
                    <aside className="w-72 hidden md:block shrink-0">
                        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-200/80 sticky top-20 space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <div className="flex items-center gap-2 font-bold text-gray-900 text-base">
                                    <Filter size={18} className="text-[#0A66C2]" />
                                    Filters
                                </div>
                                {(appliedSearch || appliedTypes.length > 0 || appliedLocation) && (
                                    <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                                )}
                            </div>

                            {/* SEARCH */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Search</label>
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Job title or company"
                                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2] transition-all"
                                    />
                                </div>
                            </div>

                            {/* JOB TYPE */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Job Type</label>
                                <div className="space-y-2.5">
                                    {['Internship', 'Full-time', 'Part-time', 'Remote'].map(type => (
                                        <label key={type} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-gray-900 select-none">
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes.includes(type)}
                                                onChange={() => handleTypeToggle(type)}
                                                className="w-4 h-4 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2] accent-[#0A66C2]"
                                            />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* LOCATION */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Location</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={locationQuery}
                                        onChange={(e) => setLocationQuery(e.target.value)}
                                        placeholder="City or Remote"
                                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2] transition-all"
                                    />
                                </div>
                            </div>

                            {/* SORT BY */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Sort By</label>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none bg-white cursor-pointer focus:ring-2 focus:ring-blue-100 focus:border-[#0A66C2] transition-all appearance-none"
                                    >
                                        <option value="Most Relevant">Most Relevant</option>
                                        <option value="Most Recent">Most Recent</option>
                                        <option value="Highest Salary">Highest Salary</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="pt-2 space-y-2">
                                <button
                                    type="button"
                                    onClick={handleApplyFilters}
                                    className="w-full py-2.5 bg-[#0A66C2] text-white text-sm font-semibold rounded-lg hover:bg-[#084e96] transition-colors shadow-xs"
                                >
                                    Apply Filters
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="w-full py-1 text-xs text-gray-500 hover:text-gray-800 text-center block transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT LISTINGS CONTENT */}
                    <main className="flex-1 min-w-0">
                        {/* Top Stats & Mobile Controls */}
                        <div className="flex items-center justify-between mb-4 bg-white px-4 py-3 rounded-xl border border-gray-200/80 shadow-xs">
                            <span className="text-sm font-semibold text-gray-700">
                                {sortedJobs.length} {sortedJobs.length === 1 ? 'job' : 'jobs'} found
                            </span>

                            {/* Mobile Filter Toggle & Sort */}
                            <div className="flex items-center gap-3 md:hidden">
                                <select
                                    value={sortBy}
                                    onChange={(e) => {
                                        setSortBy(e.target.value)
                                        setAppliedSort(e.target.value)
                                    }}
                                    className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 bg-white"
                                >
                                    <option value="Most Relevant">Relevant</option>
                                    <option value="Most Recent">Recent</option>
                                    <option value="Highest Salary">Salary</option>
                                </select>

                                <button
                                    onClick={() => setMobileFilterOpen(true)}
                                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-gray-200"
                                >
                                    <Filter size={14} />
                                    Filters
                                </button>
                            </div>
                        </div>

                        {/* JOB CARDS LIST */}
                        {sortedJobs.length === 0 ? (
                            <div className="bg-white rounded-xl p-12 text-center border border-gray-200/80 shadow-xs">
                                <Briefcase size={48} className="mx-auto text-gray-300 mb-3" />
                                <h3 className="text-lg font-bold text-gray-800">No jobs found matching your criteria</h3>
                                <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                                    Try adjusting your search terms or clearing your filters to see more available opportunities.
                                </p>
                                <button
                                    onClick={handleClearFilters}
                                    className="mt-4 px-4 py-2 bg-[#0A66C2] text-white text-xs font-semibold rounded-lg hover:bg-[#084e96] transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {sortedJobs.map((job) => (
                                    <div
                                        key={job.id}
                                        onClick={() => navigate(`/jobs/${job.id}`)}
                                        className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        {/* Row 1: Logo, Company, Title & Bookmark */}
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex gap-3.5 items-start">
                                                <img
                                                    src={job.logo}
                                                    alt={job.company}
                                                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100"
                                                />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-500">{job.company}</p>
                                                    <h3 className="font-semibold text-base text-gray-900 group-hover:text-[#0A66C2] transition-colors">
                                                        {job.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => toggleSaveJob(e, job.id)}
                                                title={job.saved ? "Saved" : "Save Job"}
                                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600 shrink-0"
                                            >
                                                <Bookmark
                                                    size={18}
                                                    className={job.saved ? "text-yellow-500 fill-yellow-500" : ""}
                                                />
                                            </button>
                                        </div>

                                        {/* Row 2: Location & Type Badge */}
                                        <div className="flex items-center gap-4 text-xs text-gray-600 mb-3 flex-wrap">
                                            <span className="flex items-center gap-1">
                                                <MapPin size={14} className="text-gray-400" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} className="text-gray-400" />
                                                <Badge variant={getBadgeVariant(job.type)}>
                                                    {job.type}
                                                </Badge>
                                            </span>
                                        </div>

                                        {/* Row 3: Salary */}
                                        <div className="mb-3">
                                            <span className="text-sm font-semibold text-emerald-600">
                                                {job.salary}
                                            </span>
                                        </div>

                                        {/* Row 4: Requirement Tags */}
                                        {job.requirements && job.requirements.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {job.requirements.slice(0, 3).map((req, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full border border-gray-200/60"
                                                    >
                                                        {req}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Row 5: Metadata Footer & Apply Button */}
                                        <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
                                            <div className="flex items-center gap-4">
                                                <span>Posted {job.postedDate}</span>
                                                <span className="flex items-center gap-1">
                                                    <Users size={13} className="text-gray-400" />
                                                    {job.applicants} applicants
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    navigate(`/jobs/${job.id}`)
                                                }}
                                                className="px-3.5 py-1.5 bg-[#0A66C2] text-white text-xs font-semibold rounded-lg hover:bg-[#084e96] transition-colors"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* MOBILE FILTER MODAL / DRAWER */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end md:hidden">
                    <div className="w-4/5 max-w-sm bg-white h-full p-5 overflow-y-auto space-y-6 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <div className="flex items-center gap-2 font-bold text-gray-900 text-base">
                                    <Filter size={18} className="text-[#0A66C2]" />
                                    Filter Jobs
                                </div>
                                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* SEARCH */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Search</label>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Job title or company"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none"
                                />
                            </div>

                            {/* JOB TYPE */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">Job Type</label>
                                <div className="space-y-2.5">
                                    {['Internship', 'Full-time', 'Part-time', 'Remote'].map(type => (
                                        <label key={type} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes.includes(type)}
                                                onChange={() => handleTypeToggle(type)}
                                                className="w-4 h-4 rounded text-[#0A66C2]"
                                            />
                                            <span>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* LOCATION */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Location</label>
                                <input
                                    type="text"
                                    value={locationQuery}
                                    onChange={(e) => setLocationQuery(e.target.value)}
                                    placeholder="City or Remote"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4 space-y-2 border-t border-gray-100">
                            <button
                                onClick={handleApplyFilters}
                                className="w-full py-2.5 bg-[#0A66C2] text-white text-sm font-semibold rounded-lg"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="w-full py-1 text-xs text-gray-500 text-center"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
