import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              TechEvent 2024
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/register" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Register Now
            </Link>
            {/* Admin link completely removed */}
          </div>
        </div>
      </div>
    </nav>
  )
}