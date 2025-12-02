'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import Map from '@/components/Map'
import Timeline from '@/components/Timeline'
import AboutSection from '@/components/AboutSection'

export default function Home() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      {/* Hero Section - Full height main section */}
      <main className="flex-grow">
        <section id="home">
          <HeroSection key={windowSize.width} />
        </section>
      </main>
      
      {/* About Section with reduced spacing */}
      <section id="about" className="py-16 md:py-20 lg:py-24">
        <AboutSection key={windowSize.width} /> 
      </section>
      
      {/* Timeline Section with reduced spacing */}
      <section id="timeline" className="py-16 md:py-20 lg:py-24">
        <Timeline key={windowSize.width} />
      </section>
      
      {/* Map Section with reduced spacing */}
      <section id="map" className="py-16 md:py-20 lg:py-24">
        <Map key={windowSize.width} />
      </section>
      
      {/* Contact/Footer Section */}
      <section id="contact" className="mt-16 md:mt-20 lg:mt-24">
        <Footer key={windowSize.width} />
      </section>
    </div>
  )
}