import Navbar from './Navbar'
import { Home, Briefcase, Users, Bell, MessageSquare } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const mobileNav = [
  { icon: Home, label: "Home", path: "/feed" },
  { icon: Briefcase, label: "Jobs", path: "/jobs" },
  { icon: Users, label: "Network", path: "/network" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Bell, label: "Alerts", path: "/notifications" },
]

export default function Layout({ children }) {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="pt-16 pb-20 md:pb-0">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-50">
        <div className="flex justify-around py-2">
          {mobileNav.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path
            return (
              <Link key={path} to={path} className={`flex flex-col items-center gap-0.5 px-3 py-1 ${active ? 'text-primary' : 'text-muted'}`}>
                <Icon size={20} />
                <span className="text-xs">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
