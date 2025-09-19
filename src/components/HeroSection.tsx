"use client";
import Link from 'next/link'
import { SparklesCore } from '@/components/ui/sparkles'
import { motion } from 'framer-motion'
import { Calendar, Users, Trophy, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#9929EA"
          speed={0.8}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-purple-800/20 border border-purple-500/30 mb-8 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse" />
              <span className="text-purple-200 font-medium">October 19-21, 2024</span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                TechEvent
              </span>
              <br />
              <span className="text-white text-4xl md:text-6xl lg:text-7xl">
                2024
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-300 leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Join us for an extraordinary{" "}
              <span className="text-purple-400 font-semibold">24-hour hackathon</span>{" "}
              featuring cutting-edge workshops, fierce competitions, and unparalleled networking opportunities
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <Link 
                href="/register" 
                className="group bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center"
              >
                Register Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group border-2 border-purple-500/50 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <motion.div 
              className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:border-purple-500/30"
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="text-purple-400 mb-4">
                <Calendar className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Technical Workshops</h3>
              <p className="text-gray-400">Learn cutting-edge technologies from industry experts and enhance your skills</p>
            </motion.div>

            <motion.div 
              className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:border-purple-500/30"
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="text-purple-400 mb-4">
                <Trophy className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Competitions</h3>
              <p className="text-gray-400">Showcase your skills in exciting challenges and win amazing prizes</p>
            </motion.div>

            <motion.div 
              className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:border-purple-500/30"
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="text-purple-400 mb-4">
                <Users className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Networking</h3>
              <p className="text-gray-400">Connect with like-minded developers, mentors, and industry professionals</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  )
}
