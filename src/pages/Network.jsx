import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { users as mockUsers } from '../data/mockData'
import Avatar from '../components/ui/Avatar'
import {
    UserCheck,
    UserPlus,
    UserX,
    Search,
    Filter,
    Check,
    X,
    Building2,
    MoreVertical,
    MessageSquare,
    Users,
    Sparkles
} from 'lucide-react'

// Local mock company data
const INITIAL_COMPANIES = [
    {
        id: "c1",
        name: "TCS",
        industry: "IT Services & Consulting",
        size: "600,000+",
        followers: "4.8M",
        logo: "https://ui-avatars.com/api/?name=TCS&background=0A66C2&color=fff",
        description: "Global leader in IT services, consulting & business solutions building trust across industries worldwide.",
        isFollowing: false
    },
    {
        id: "c2",
        name: "Infosys",
        industry: "Next-Gen Digital Services",
        size: "340,000+",
        followers: "3.9M",
        logo: "https://ui-avatars.com/api/?name=Infosys&background=007CC3&color=fff",
        description: "Global leader in next-generation digital services and consulting enabling clients across 50+ countries.",
        isFollowing: false
    },
    {
        id: "c3",
        name: "Google India",
        industry: "Technology & Software",
        size: "180,000+",
        followers: "12.5M",
        logo: "https://ui-avatars.com/api/?name=Google&background=4285F4&color=fff",
        description: "Organizing the world's information and making it universally accessible and useful for everyone.",
        isFollowing: true
    },
    {
        id: "c4",
        name: "Razorpay",
        industry: "Fintech & Payments",
        size: "3,000+",
        followers: "850K",
        logo: "https://ui-avatars.com/api/?name=Razorpay&background=2EB5C9&color=fff",
        description: "India's leading payments and financial services solution powering over 8 Million growing businesses.",
        isFollowing: false
    },
    {
        id: "c5",
        name: "Zomato",
        industry: "Food Tech & Delivery",
        size: "5,000+",
        followers: "1.2M",
        logo: "https://ui-avatars.com/api/?name=Zomato&background=E23744&color=fff",
        description: "Connecting millions of customers with top restaurants and quick commerce delivery across India.",
        isFollowing: false
    },
    {
        id: "c6",
        name: "Flipkart",
        industry: "E-Commerce & Retail",
        size: "50,000+",
        followers: "2.4M",
        logo: "https://ui-avatars.com/api/?name=Flipkart&background=F7A600&color=fff",
        description: "India's leading e-commerce marketplace transforming digital commerce, logistics, and payments.",
        isFollowing: false
    }
]

export default function Network() {
    const [activeTab, setActiveTab] = useState('Connections')

    // Local state for connections
    const [connectedUsers, setConnectedUsers] = useState(
        mockUsers.filter(u => u.isConnected)
    )

    // Local state for pending invitations (using mock users 3, 4, 5)
    const [pendingInvitations, setPendingInvitations] = useState([
        { ...mockUsers[2], time: "2 days ago" },
        { ...mockUsers[3], time: "3 days ago" },
        { ...mockUsers[4], time: "1 week ago" }
    ])

    // Local state for discoverable users (not connected)
    const [discoverUsers, setDiscoverUsers] = useState(
        mockUsers.filter(u => !u.isConnected)
    )

    // Connecting status per user id ('idle' | 'pending' | 'connected')
    const [connectStates, setConnectStates] = useState({})

    // Companies state
    const [companies, setCompanies] = useState(INITIAL_COMPANIES)

    // Connections Search State
    const [connectionSearch, setConnectionSearch] = useState('')

    // Discover Skill Filter State
    const [selectedSkillFilter, setSelectedSkillFilter] = useState('All')

    // Connection Menu Dropdown open state per user id
    const [openMenuId, setOpenMenuId] = useState(null)

    // Remove connection handler
    const handleRemoveConnection = (userId) => {
        setConnectedUsers(prev => prev.filter(u => u.id !== userId))
        setOpenMenuId(null)
    }

    // Accept Invitation Handler
    const handleAcceptInvitation = (invite) => {
        setPendingInvitations(prev => prev.filter(item => item.id !== invite.id))
        setConnectedUsers(prev => [...prev, { ...invite, isConnected: true }])
    }

    // Decline Invitation Handler
    const handleDeclineInvitation = (inviteId) => {
        setPendingInvitations(prev => prev.filter(item => item.id !== inviteId))
    }

    // Connect request handler for Discover People
    const handleConnectRequest = (userId) => {
        setConnectStates(prev => ({ ...prev, [userId]: 'pending' }))
        setTimeout(() => {
            setConnectStates(prev => ({ ...prev, [userId]: 'connected' }))
        }, 2000)
    }

    // Toggle company follow state
    const toggleFollowCompany = (companyId) => {
        setCompanies(prev =>
            prev.map(c => (c.id === companyId ? { ...c, isFollowing: !c.isFollowing } : c))
        )
    }

    // Filtered connections list
    const filteredConnections = connectedUsers.filter(user => {
        const q = connectionSearch.toLowerCase()
        return user.name.toLowerCase().includes(q) || user.headline.toLowerCase().includes(q)
    })

    // Filtered discover users list
    const filteredDiscoverUsers = discoverUsers.filter(user => {
        if (selectedSkillFilter === 'All') return true
        if (!user.skills) return false
        return user.skills.some(s => {
            const skillLower = s.toLowerCase()
            const filterLower = selectedSkillFilter.toLowerCase()
            if (filterLower === 'tech') return skillLower.includes('java') || skillLower.includes('python') || skillLower.includes('react') || skillLower.includes('node') || skillLower.includes('sql')
            if (filterLower === 'design') return skillLower.includes('ux') || skillLower.includes('figma') || skillLower.includes('design')
            if (filterLower === 'business') return skillLower.includes('excel') || skillLower.includes('strategy') || skillLower.includes('consulting') || skillLower.includes('modeling')
            if (filterLower === 'marketing') return skillLower.includes('marketing') || skillLower.includes('seo') || skillLower.includes('analytics')
            return skillLower.includes(filterLower)
        })
    })

    const tabs = [
        { id: 'Connections', label: 'Connections', count: connectedUsers.length },
        { id: 'Invitations', label: 'Invitations', countBadge: pendingInvitations.length },
        { id: 'Discover People', label: 'Discover People' },
        { id: 'Discover Companies', label: 'Discover Companies' }
    ]

    return (
        <div className="min-h-screen bg-[#F3F2EE] py-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* TOP SECTION */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Network</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        You have {connectedUsers.length} {connectedUsers.length === 1 ? 'connection' : 'connections'}
                    </p>
                </div>

                {/* TABS ROW */}
                <div className="bg-white rounded-xl shadow-xs border border-gray-200/80 mb-6 px-4 pt-4 pb-0 overflow-x-auto">
                    <div className="flex gap-8 border-b border-gray-100 text-sm font-semibold min-w-max">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-3.5 transition-all flex items-center gap-2 relative ${isActive
                                            ? 'text-[#0A66C2] border-b-2 border-[#0A66C2]'
                                            : 'text-gray-500 hover:text-gray-800'
                                        }`}
                                >
                                    <span>{tab.label}</span>

                                    {/* Badges */}
                                    {tab.id === 'Connections' && (
                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                            {connectedUsers.length}
                                        </span>
                                    )}

                                    {tab.id === 'Invitations' && pendingInvitations.length > 0 && (
                                        <span className="w-5 h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                                            {pendingInvitations.length}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* TAB CONTENTS WITH ANIMATE PRESENCE */}
                <AnimatePresence mode="wait">

                    {/* TAB 1: CONNECTIONS */}
                    {activeTab === 'Connections' && (
                        <motion.div
                            key="tab-connections"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4"
                        >
                            {/* Search Bar */}
                            <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs flex items-center gap-3">
                                <Search size={18} className="text-gray-400 ml-1" />
                                <input
                                    type="text"
                                    value={connectionSearch}
                                    onChange={(e) => setConnectionSearch(e.target.value)}
                                    placeholder="Search connections by name or headline..."
                                    className="w-full text-sm outline-none bg-transparent text-gray-800"
                                />
                                {connectionSearch && (
                                    <button onClick={() => setConnectionSearch('')} className="text-gray-400 hover:text-gray-600">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Connections Grid */}
                            {filteredConnections.length === 0 ? (
                                <div className="bg-white rounded-xl p-12 text-center border border-gray-200/80 shadow-xs">
                                    <Users size={48} className="mx-auto text-gray-300 mb-3" />
                                    <h3 className="text-lg font-bold text-gray-800">No connections found</h3>
                                    <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                                        {connectionSearch ? "Try adjusting your search terms" : "Start expanding your professional network!"}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredConnections.map((user) => (
                                        <div
                                            key={user.id}
                                            className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all text-center relative flex flex-col justify-between"
                                        >
                                            {/* Menu Button Top Right */}
                                            <div className="absolute top-3 right-3">
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                                                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>
                                                {openMenuId === user.id && (
                                                    <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 text-left">
                                                        <button
                                                            onClick={() => handleRemoveConnection(user.id)}
                                                            className="w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                                        >
                                                            <UserX size={14} />
                                                            Remove Connection
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div>
                                                <div className="mt-2 flex justify-center">
                                                    <Avatar src={user.avatar} name={user.name} size="lg" />
                                                </div>
                                                <h3 className="font-semibold text-base text-gray-900 mt-3">{user.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[32px]">
                                                    {user.headline}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                                                    <Users size={12} />
                                                    {user.mutualConnections || 5} mutual connections
                                                </p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="mt-4 pt-3 border-t border-gray-100">
                                                <Link
                                                    to="/messages"
                                                    className="w-full py-2 border border-[#0A66C2] text-[#0A66C2] hover:bg-blue-50 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                                                >
                                                    <MessageSquare size={14} />
                                                    Message
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* TAB 2: INVITATIONS */}
                    {activeTab === 'Invitations' && (
                        <motion.div
                            key="tab-invitations"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-3"
                        >
                            {pendingInvitations.length === 0 ? (
                                <div className="bg-white rounded-xl p-12 text-center border border-gray-200/80 shadow-xs">
                                    <UserCheck size={48} className="mx-auto text-gray-300 mb-3" />
                                    <h3 className="text-lg font-bold text-gray-800">No pending invitations</h3>
                                    <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                                        You're all caught up! Check back later or discover new people to connect with.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <AnimatePresence>
                                        {pendingInvitations.map((invite) => (
                                            <motion.div
                                                key={invite.id}
                                                layout
                                                initial={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap"
                                            >
                                                <div className="flex items-center gap-3.5 min-w-0">
                                                    <Avatar src={invite.avatar} name={invite.name} size="md" />
                                                    <div className="min-w-0">
                                                        <h4 className="font-semibold text-sm text-[#1B1F23]">{invite.name}</h4>
                                                        <p className="text-xs text-gray-500 truncate">{invite.headline}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            {invite.mutualConnections || 8} mutual connections • {invite.time}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
                                                    <button
                                                        onClick={() => handleDeclineInvitation(invite.id)}
                                                        className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors"
                                                    >
                                                        Decline
                                                    </button>
                                                    <button
                                                        onClick={() => handleAcceptInvitation(invite)}
                                                        className="px-4 py-2 bg-[#0A66C2] text-white hover:bg-[#084e96] text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
                                                    >
                                                        <UserCheck size={14} />
                                                        Accept
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* TAB 3: DISCOVER PEOPLE */}
                    {activeTab === 'Discover People' && (
                        <motion.div
                            key="tab-discover"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4"
                        >
                            {/* Skill Filter Chips */}
                            <div className="flex items-center gap-2 flex-wrap bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs">
                                <span className="text-xs font-semibold text-gray-500 mr-2 flex items-center gap-1">
                                    <Filter size={14} /> Filter by field:
                                </span>
                                {['All', 'Tech', 'Design', 'Business', 'Marketing'].map(chip => (
                                    <button
                                        key={chip}
                                        onClick={() => setSelectedSkillFilter(chip)}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${selectedSkillFilter === chip
                                                ? 'bg-[#0A66C2] text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>

                            {/* Discover Users Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredDiscoverUsers.map((user) => {
                                    const state = connectStates[user.id] || 'idle'

                                    return (
                                        <div
                                            key={user.id}
                                            className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs text-center flex flex-col justify-between hover:shadow-md transition-all"
                                        >
                                            <div>
                                                <div className="mt-2 flex justify-center">
                                                    <Avatar src={user.avatar} name={user.name} size="lg" />
                                                </div>
                                                <h3 className="font-semibold text-base text-[#1B1F23] mt-2">{user.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[32px]">
                                                    {user.headline}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1.5">
                                                    {user.mutualConnections || 4} mutual connections
                                                </p>

                                                {/* Skills Preview Tags */}
                                                {user.skills && user.skills.length > 0 && (
                                                    <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                                                        {user.skills.slice(0, 2).map((skill, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full font-medium"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Connect Button */}
                                            <div className="mt-4 pt-3 border-t border-gray-100">
                                                {state === 'idle' && (
                                                    <button
                                                        onClick={() => handleConnectRequest(user.id)}
                                                        className="w-full py-2 bg-[#0A66C2] text-white text-xs font-semibold rounded-lg hover:bg-[#084e96] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                                                    >
                                                        <UserPlus size={14} />
                                                        Connect
                                                    </button>
                                                )}

                                                {state === 'pending' && (
                                                    <button
                                                        disabled
                                                        className="w-full py-2 bg-gray-100 text-gray-500 text-xs font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                                                    >
                                                        <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                                        Pending
                                                    </button>
                                                )}

                                                {state === 'connected' && (
                                                    <div className="w-full py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5">
                                                        <Check size={14} />
                                                        Connected ✓
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* TAB 4: DISCOVER COMPANIES */}
                    {activeTab === 'Discover Companies' && (
                        <motion.div
                            key="tab-companies"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {companies.map((comp) => (
                                <div
                                    key={comp.id}
                                    className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                                >
                                    <div>
                                        <div className="flex items-start gap-3.5 mb-2">
                                            <img
                                                src={comp.logo}
                                                alt={comp.name}
                                                className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-base text-gray-900">{comp.name}</h3>
                                                <p className="text-xs font-medium text-gray-500">{comp.industry}</p>
                                                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                                    <span>{comp.size} employees</span>
                                                    <span>•</span>
                                                    <span>{comp.followers} followers</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-600 my-3 leading-relaxed line-clamp-2">
                                            {comp.description}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-gray-100 flex justify-end">
                                        <button
                                            onClick={() => toggleFollowCompany(comp.id)}
                                            className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${comp.isFollowing
                                                    ? 'bg-[#0A66C2] text-white shadow-xs'
                                                    : 'border border-[#0A66C2] text-[#0A66C2] hover:bg-blue-50'
                                                }`}
                                        >
                                            {comp.isFollowing ? (
                                                <>
                                                    <Check size={14} />
                                                    Following ✓
                                                </>
                                            ) : (
                                                <>
                                                    <Building2 size={14} />
                                                    Follow
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    )
}
