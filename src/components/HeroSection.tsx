import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          TechEvent 2024
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Join us for an amazing technical event featuring workshops, competitions, and networking opportunities
        </p>
        <div className="space-x-4">
          <Link 
            href="/register" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Register Now
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Technical Workshops</h3>
            <p>Learn from industry experts</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Competitions</h3>
            <p>Showcase your skills</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Networking</h3>
            <p>Connect with peers</p>
          </div>
        </div>
      </div>
    </section>
  )
}