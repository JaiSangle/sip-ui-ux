import { Link } from 'react-router-dom'
import { Home, LogIn } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#F3F2EE] flex items-center justify-center p-4 text-center">
            <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md w-full border border-gray-200/80 shadow-xs">
                <h1 className="text-7xl font-extrabold text-[#0A66C2] mb-2 tracking-tight">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                <p className="text-sm text-gray-500 max-w-xs mx-auto mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <Link
                        to="/feed"
                        className="bg-[#0A66C2] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#084e96] transition-colors shadow-xs flex items-center gap-2"
                    >
                        <Home size={16} />
                        Go to Home
                    </Link>
                    <Link
                        to="/login"
                        className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <LogIn size={16} />
                        Go to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
