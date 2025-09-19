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
      
      {/* About Section with increased spacing */}
      <section id="about" className="py-24 md:py-32 lg:py-40">
        <AboutSection /> 
      </section>
      
      {/* Timeline Section with increased spacing */}
      <section id="timeline" className="py-24 md:py-32 lg:py-40">
        <Timeline />
      </section>
      
      {/* Map Section with increased spacing */}
      <section id="map" className="py-24 md:py-32 lg:py-40">
        <Map />
      </section>
      
      {/* Contact/Footer Section */}
      <section id="contact" className="mt-24 md:mt-32 lg:mt-40">
        <Footer />
      </section>
    </div>
  )
}