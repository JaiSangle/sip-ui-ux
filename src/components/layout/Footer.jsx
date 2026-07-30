import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">ProNet</h2>
            <p className="text-sm max-w-xs">The professional network built for higher education students and emerging professionals.</p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-1">Platform</span>
              <Link to="/feed" className="hover:text-white transition-colors">Home</Link>
              <Link to="/jobs" className="hover:text-white transition-colors">Jobs</Link>
              <Link to="/network" className="hover:text-white transition-colors">Network</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-1">Company</span>
              <span className="hover:text-white cursor-pointer transition-colors">About</span>
              <span className="hover:text-white cursor-pointer transition-colors">Careers</span>
              <span className="hover:text-white cursor-pointer transition-colors">Help</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-1">Legal</span>
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center">
          © 2024 ProNet. Made for students, by students.
        </div>
      </div>
    </footer>
  )
}
