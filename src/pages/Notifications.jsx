import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { notifications as notificationsData } from '../data/mockData'
import {
    UserPlus,
    ThumbsUp,
    MessageSquare,
    Briefcase,
    AtSign,
    Bell,
    BellOff,
    Check
} from 'lucide-react'

export default function Notifications() {
    const [notifs, setNotifs] = useState(notificationsData)
    const [activeFilter, setActiveFilter] = useState('all')

    // Check if all are read
    const allRead = !notifs.some(n => !n.read)

    // Mark all as read handler
    const handleMarkAllAsRead = () => {
        setNotifs(prev => prev.map(n => ({ ...n, read: true })))
    }

    // Mark single as read
    const handleMarkAsRead = (id) => {
        setNotifs(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)))
    }

    // Accept connection invitation handler
    const handleAcceptConnection = (e, id) => {
        e.stopPropagation()
        setNotifs(prev => prev.map(n => (n.id === id ? { ...n, read: true, accepted: true } : n)))
    }

    // Decline/Remove notification handler
    const handleRemoveNotification = (e, id) => {
        e.stopPropagation()
        setNotifs(prev => prev.filter(n => n.id !== id))
    }

    // Filter notifications logic
    const filteredNotifs = notifs.filter(n => {
        if (activeFilter === 'connections') return n.type === 'connection_request'
        if (activeFilter === 'jobs') return n.type === 'job_alert'
        if (activeFilter === 'likes') return n.type === 'post_like'
        if (activeFilter === 'comments') return n.type === 'comment'
        if (activeFilter === 'mentions') return n.type === 'mention'
        return true
    })

    // Group into "Today" vs "Earlier"
    const isToday = (timeStr) => {
        if (!timeStr) return false
        const lower = timeStr.toLowerCase()
        return (
            lower.includes('minute') ||
            lower.includes('minutes') ||
            lower.includes('hour') ||
            lower.includes('hours') ||
            lower.includes('m ago') ||
            lower.includes('h ago') ||
            lower.includes('2m') ||
            lower.includes('1h') ||
            lower.includes('3h') ||
            lower.includes('5h')
        )
    }

    const todayNotifs = filteredNotifs.filter(n => isToday(n.time))
    const earlierNotifs = filteredNotifs.filter(n => !isToday(n.time))

    // Render Type Badge Icon
    const renderTypeIcon = (type) => {
        switch (type) {
            case 'connection_request':
                return (
                    <div className="w-5 h-5 bg-blue-100 text-[#0A66C2] rounded-full flex items-center justify-center shrink-0">
                        <UserPlus size={11} />
                    </div>
                )
            case 'post_like':
                return (
                    <div className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                        <ThumbsUp size={11} />
                    </div>
                )
            case 'job_alert':
                return (
                    <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                        <Briefcase size={11} />
                    </div>
                )
            case 'comment':
                return (
                    <div className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                        <MessageSquare size={11} />
                    </div>
                )
            case 'mention':
                return (
                    <div className="w-5 h-5 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                        <AtSign size={11} />
                    </div>
                )
            default:
                return (
                    <div className="w-5 h-5 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                        <Bell size={11} />
                    </div>
                )
        }
    }

    // Filter Pill Config
    const filterPills = [
        { id: 'all', label: 'All' },
        { id: 'connections', label: 'Connections' },
        { id: 'jobs', label: 'Jobs' },
        { id: 'likes', label: 'Likes' },
        { id: 'comments', label: 'Comments' },
        { id: 'mentions', label: 'Mentions' }
    ]

    const renderNotifCard = (notification) => {
        return (
            <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                transition={{ duration: 0.25 }}
                onClick={() => handleMarkAsRead(notification.id)}
                className={`rounded-xl p-4 shadow-xs mb-2.5 flex items-start gap-3.5 transition-all cursor-pointer border ${!notification.read
                        ? 'bg-blue-50/60 border-l-4 border-l-[#0A66C2] border-gray-200/80'
                        : 'bg-white border-l-4 border-l-transparent border-gray-200/80 hover:border-gray-300'
                    }`}
            >
                {/* Left Avatar & Overlay Icon */}
                <div className="relative shrink-0">
                    <img
                        src={notification.avatar || `https://ui-avatars.com/api/?name=Notification&background=0A66C2&color=fff`}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    />
                    <div className="absolute -bottom-1 -right-1">
                        {renderTypeIcon(notification.type)}
                    </div>
                </div>

                {/* Middle Content */}
                <div className="flex-1 min-w-0 pr-2">
                    <p className="text-sm text-gray-800 leading-snug">
                        {notification.message}
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">
                        {notification.time}
                    </span>
                </div>

                {/* Right Side Action Buttons */}
                <div className="shrink-0 flex items-center gap-2 self-center">
                    {notification.type === 'connection_request' && (
                        <>
                            {notification.accepted ? (
                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1">
                                    <Check size={13} /> Accepted
                                </span>
                            ) : (
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={(e) => handleAcceptConnection(e, notification.id)}
                                        className="px-3 py-1 bg-[#0A66C2] text-white text-xs font-semibold rounded-lg hover:bg-[#084e96] transition-colors shadow-xs"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={(e) => handleRemoveNotification(e, notification.id)}
                                        className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors"
                                    >
                                        Decline
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {notification.type === 'job_alert' && (
                        <Link
                            to="/jobs"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1 bg-[#0A66C2] text-white text-xs font-semibold rounded-lg hover:bg-[#084e96] transition-colors shadow-xs"
                        >
                            View Jobs
                        </Link>
                    )}

                    {notification.type === 'post_like' && (
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors"
                        >
                            View Post
                        </button>
                    )}

                    {notification.type === 'comment' && (
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors"
                        >
                            View
                        </button>
                    )}

                    {notification.type === 'mention' && (
                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors"
                        >
                            View
                        </button>
                    )}
                </div>
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F3F2EE] py-6">
            <div className="max-w-3xl mx-auto px-4">

                {/* TOP HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Stay updated on connections, opportunities, and activity</p>
                    </div>
                    <button
                        onClick={handleMarkAllAsRead}
                        disabled={allRead}
                        className={`text-xs font-semibold px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${allRead
                                ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                : 'text-[#0A66C2] bg-blue-50 hover:bg-blue-100 border border-blue-200'
                            }`}
                    >
                        <Check size={14} />
                        {allRead ? 'All Read' : 'Mark all as read'}
                    </button>
                </div>

                {/* FILTER TABS ROW (Pills style) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
                    {filterPills.map(pill => {
                        const isActive = activeFilter === pill.id
                        return (
                            <button
                                key={pill.id}
                                onClick={() => setActiveFilter(pill.id)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${isActive
                                        ? 'bg-[#0A66C2] text-white shadow-xs'
                                        : 'bg-white text-gray-600 border border-gray-200/80 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                {pill.label}
                            </button>
                        )
                    })}
                </div>

                {/* NOTIFICATIONS CONTENT */}
                {filteredNotifs.length === 0 ? (
                    /* EMPTY STATE */
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 shadow-xs my-4">
                        <BellOff size={48} className="mx-auto text-gray-300 mb-3" />
                        <h3 className="text-lg font-bold text-gray-800">No notifications</h3>
                        <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                            You're all caught up! New notifications will appear here when available.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* TODAY GROUP */}
                        {todayNotifs.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today</span>
                                    <div className="flex-1 h-px bg-gray-200/80"></div>
                                </div>
                                <AnimatePresence>
                                    {todayNotifs.map(n => renderNotifCard(n))}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* EARLIER GROUP */}
                        {earlierNotifs.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Earlier</span>
                                    <div className="flex-1 h-px bg-gray-200/80"></div>
                                </div>
                                <AnimatePresence>
                                    {earlierNotifs.map(n => renderNotifCard(n))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    )
}
