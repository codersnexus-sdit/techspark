import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import Map from '@/components/Map'
import Timeline from '@/components/Timeline'
import AboutSection from '@/components/AboutSection'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      {/* Hero Section - Full height main section */}
      <main className="flex-grow">
        <section id="home">
          <HeroSection />
        </section>
      </main>
      
      {/* About Section with reduced spacing */}
      <section id="about" className="py-16 md:py-20 lg:py-24">
        <AboutSection /> 
      </section>
      
      {/* Timeline Section with reduced spacing */}
      <section id="timeline" className="py-16 md:py-20 lg:py-24">
        <Timeline />
      </section>
      
      {/* Map Section with reduced spacing */}
      <section id="map" className="py-16 md:py-20 lg:py-24">
        <Map />
      </section>
      
      {/* Contact/Footer Section */}
      <section id="contact" className="mt-16 md:mt-20 lg:mt-24">
        <Footer />
      </section>
    </div>
  )
}