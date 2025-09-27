'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GradientBlinds from '@/components/ui/GradientBlinds'

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden">
      {/* Purple Dark Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-800/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-700/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">
        {/* Logo in top corner */}
        <Link href="/" className="absolute top-4 left-4 lg:top-8 lg:left-8 z-30 group flex items-center space-x-2 lg:space-x-3">
          <div className="relative">
            <img 
              src="/assets/logo/logo.png" 
              alt="Coders Nexus Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-purple-600/30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight group-hover:text-purple-200 transition-colors duration-300 drop-shadow-md">
              Coders Nexus
            </span>
            <span className="hidden md:block text-purple-200/80 text-xs lg:text-sm font-medium group-hover:text-purple-100 transition-colors duration-300">
              SDIT Open Source Community
            </span>
          </div>
        </Link>
        
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto w-full">
          {/* Hanging Sign */}
          <motion.div 
            className="relative mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            {/* Hanging Strings - Hidden on mobile/tablet, visible on desktop */}
            <motion.div 
              className="absolute -top-20 sm:-top-24 md:-top-16 lg:-top-20 left-1/2 transform -translate-x-1/2 hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-64 sm:w-72 md:w-80 max-w-full">
                {/* Left String */}
                <motion.div 
                  className="absolute -top-2 sm:-top-4 left-6 sm:left-8 md:left-10 lg:left-12 w-0.5 sm:w-1 h-44 sm:h-52 md:h-48 lg:h-22 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 transform rotate-12 shadow-lg"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  style={{ transformOrigin: "top" }}
                />
                {/* Right String */}
                <motion.div 
                  className="absolute -top-2 sm:-top-4 right-6 sm:right-8 md:right-10 lg:right-12 w-0.5 sm:w-1 h-44 sm:h-52 md:h-48 lg:h-22 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 transform -rotate-12 shadow-lg"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  style={{ transformOrigin: "top" }}
                />
                
                {/* Hanging Points */}
                <motion.div 
                  className="absolute top-0 sm:top-2 md:top-3 lg:top-4 left-6 sm:left-8 md:left-10 lg:left-12 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-purple-600 rounded-full border-2 sm:border-3 border-white shadow-xl transform -translate-x-1 sm:-translate-x-2"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
                />
                <motion.div 
                  className="absolute top-0 sm:top-2 md:top-3 lg:top-4 right-6 sm:right-8 md:right-10 lg:right-12 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-purple-600 rounded-full border-2 sm:border-3 border-white shadow-xl transform translate-x-1 sm:translate-x-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 200 }}
                />
              </div>
            </motion.div>
            
            {/* Main Sign */}
            <motion.div 
              className="relative mt-6 sm:mt-8 md:mt-12 lg:mt-16 mx-auto w-64 sm:w-72 md:w-80 max-w-full px-4"
              initial={{ opacity: 0, y: 20, rotateX: -15 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                rotate: [0, 1, -1, 0]
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.8 },
                y: { duration: 0.8, delay: 0.8 },
                rotateX: { duration: 0.8, delay: 0.8 },
                rotate: { 
                  duration: 4, 
                  delay: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
              whileHover={{ 
                scale: 1.02,
                rotate: 2,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="bg-gradient-to-br from-gray-900/95 via-black/90 to-purple-900/95 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 sm:border-4 border-purple-500/30 transform transition-all duration-500 hover:shadow-3xl backdrop-blur-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2, type: "spring", stiffness: 150 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-purple-300 text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 tracking-widest"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    SORRY
                  </motion.div>
                  <motion.div 
                    className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-1 sm:mb-2 tracking-tight leading-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      textShadow: [
                        "0 0 0px rgba(147, 51, 234, 0)",
                        "0 0 20px rgba(147, 51, 234, 0.8)",
                        "0 0 0px rgba(147, 51, 234, 0)"
                      ]
                    }}
                    transition={{ 
                      opacity: { duration: 0.6, delay: 1.7 },
                      scale: { duration: 0.6, delay: 1.7, type: "spring", stiffness: 200 },
                      textShadow: { duration: 2, delay: 2.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    WE ARE
                  </motion.div>
                  <motion.div 
                    className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 sm:mb-3 md:mb-4 tracking-tight leading-none"
                    initial={{ opacity: 0, scale: 0.3, rotateY: 180 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotateY: 0,
                      textShadow: [
                        "0 0 0px rgba(236, 72, 153, 0)",
                        "0 0 25px rgba(236, 72, 153, 0.9)",
                        "0 0 0px rgba(236, 72, 153, 0)"
                      ]
                    }}
                    transition={{ 
                      opacity: { duration: 0.8, delay: 1.9 },
                      scale: { duration: 0.8, delay: 1.9, type: "spring", stiffness: 150 },
                      rotateY: { duration: 0.8, delay: 1.9 },
                      textShadow: { duration: 2.5, delay: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    CLOSED
                  </motion.div>
                  <motion.div 
                    className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                  >
                    Registration period has ended
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Information Section */}
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/20 shadow-xl mb-6 sm:mb-8 mx-4 sm:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
          >
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 drop-shadow-md">
              Thank You for Your Interest!
            </h2>
            
            <div className="space-y-3 sm:space-y-4 text-white/90 text-base sm:text-lg mb-6 sm:mb-8">
              <p className="flex items-center justify-center space-x-2">
                <span className="text-purple-400">•</span>
                <span className="text-sm sm:text-base md:text-lg">Registration deadline has passed</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span className="text-purple-400">•</span>
                <span className="text-sm sm:text-base md:text-lg">Maximum capacity has been reached</span>
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span className="text-purple-400">•</span>
                <span className="text-sm sm:text-base md:text-lg">Stay tuned for future events</span>
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="space-y-4 mb-6 sm:mb-8">
              <div className="text-white/80 text-base sm:text-lg font-semibold">
                Follow us for updates on future events
              </div>
              
              <div className="flex justify-center space-x-4 sm:space-x-6">
                {/* Instagram */}
                <a
                  href="https://instagram.com/coders_nexus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                {/* GitHub */}
                <a
                  href="https://github.com/codersnexus-sdit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Follow us on GitHub"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/codersnexus-sdit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                {/* Gmail */}
                <a
                  href="mailto: codersnexus.osc@gmail.com"
                  className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Email us"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.907L12 11.27l9.457-7.447h.907c.904 0 1.636.732 1.636 1.636z"/>
                  </svg>
                </a>
              </div>
              
              {/* Contact Info */}
              <div className="text-center text-white/70 text-xs sm:text-sm space-y-1">
                <div>Email: codersnexus.osc@gmail.com</div>
              </div>
            </div>
            
            <motion.a
              href="/"
              className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-800 to-black border-2 border-purple-500/30 text-white font-bold text-base sm:text-lg shadow-lg hover:from-gray-700 hover:to-gray-900 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 3.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}