import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import Map from '@/components/Map'
import Timeline from '@/components/Timeline'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
      </main>
      <Timeline />
      <Map />
      <Footer />
    </div>
  )
}