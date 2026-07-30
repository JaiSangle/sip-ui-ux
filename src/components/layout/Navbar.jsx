import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Briefcase, Users, Bell, MessageSquare, Search, ChevronDown, LogOut, User } from 'lucide-react'
import { currentUser, notifications } from '../../data/mockData'

const navLinks = [
  { icon: Home, label: "Home", path: "/feed" },
  { icon: Briefcase, label: "Jobs", path: "/jobs" },
  { icon: Users, label: "Network", path: "/network" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
]

export default function Navbar() {
  const { logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const unreadNotifications = notifications.filter(n => !n.read).length > 0

  const handleSignOut = () => {
    setShowDropdown(false)
    logout()
    navigate('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/feed" className="text-primary font-bold text-2xl shrink-0">
          ProNet
        </Link>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 mx-4 flex-1 max-w-md">
          <Search size={18} className="text-muted mr-2" />
          <input
            type="text"
            placeholder="Search professionals, jobs..."
            className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-muted"
          />
        </div>

        {/* Right: Nav Icons */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path
            const isNotification = path === "/notifications"
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center px-3 py-1 rounded-md transition-colors hover:text-primary ${active ? 'text-primary' : 'text-muted'}`}
              >
                <div className="relative">
                  <Icon size={20} />
                  {isNotification && unreadNotifications && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <span className="text-xs mt-0.5">{label}</span>
              </Link>
            )
          })}

          {/* User Avatar & Dropdown */}
          <div className="relative ml-2 border-l pl-3 border-gray-200">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex flex-col items-center text-muted hover:text-primary transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <div className="flex items-center gap-0.5">
                <span className="text-xs">Me</span>
                <ChevronDown size={12} />
              </div>
            </button>

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                      <p className="text-xs text-muted truncate max-w-[140px]">{currentUser.headline}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/profile/1"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} />
                  View Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
