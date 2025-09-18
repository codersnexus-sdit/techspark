import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import Map from '@/components/Map'
import Timeline from '@/components/Timeline'
import AboutSection from '@/components/AboutSection'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
      </main>
      <AboutSection /> 
      <Timeline />
      <Map />
      <Footer />
    </div>
  )
}