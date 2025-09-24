'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, Calendar, MapPin, Users } from 'lucide-react'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8 sm:py-12 lg:py-16 relative">
      {/* Logo in top corner - responsive positioning */}
      <Link href="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-10 group flex items-center space-x-2 sm:space-x-3">
        <div className="relative">
          <img 
            src="/assets/logo/logo.png" 
            alt="Coders Nexus Logo" 
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-sm sm:text-lg lg:text-xl font-bold tracking-tight group-hover:text-purple-300 transition-colors duration-300">
            Coders Nexus
          </span>
          <span className="text-gray-400 text-xs sm:text-sm font-medium group-hover:text-purple-400 transition-colors duration-300">
            SDIT Open Source Community
          </span>
        </div>
      </Link>

      {/* Main content with proper spacing from navbar */}
      <div className="max-w-2xl w-full text-center mt-20 sm:mt-16 lg:mt-0">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-500 rounded-full mb-4 sm:mb-6">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2"
        >
          Thank You for Registering!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2"
        >
          Your registration for <span className="text-purple-400 font-semibold">TechSpark 2025</span> has been successfully submitted. 
          We&apos;re excited to have you join us for this amazing technical event!
        </motion.p>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 mb-6 sm:mb-8 mx-2 sm:mx-0"
        >
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6">Event Details</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-gray-300">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
              <span className="text-sm sm:text-base lg:text-lg">29th September 2025</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-gray-300">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
              <span className="text-sm sm:text-base lg:text-lg text-center">Shree Devi Institute of Technology</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-gray-300">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
              <span className="text-sm sm:text-base lg:text-lg">Individual Participants</span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-6 sm:mb-8 px-2 sm:px-0"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">What&apos;s Next?</h3>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            You will receive a confirmation email shortly with further details about the event. 
            Keep an eye on your inbox for updates and event schedule.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-base sm:text-lg shadow-md hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
            Back to Home
          </Link>
          
          <Link
            href="/#about"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-purple-500 text-white font-semibold text-base sm:text-lg hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Learn More About Event
          </Link>
        </motion.div>
      </div>
    </div>
  )
}