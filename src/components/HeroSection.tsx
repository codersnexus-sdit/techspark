"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Clock } from 'lucide-react';
import Shuffle from '@/components/ui/Shuffle';
import { Press_Start_2P } from 'next/font/google';

const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin'] });
import GradientBlinds from '@/components/ui/GradientBlinds';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* GradientBlinds Background - full page */}
      <div className="absolute inset-0 w-full h-full z-0">
        <GradientBlinds
          gradientColors={['#FF9FFC', '#5227FF']}
          angle={45}
          noise={0.25}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={0.9}
          mouseDampening={0.15}
          distortAmount={0.1}
          shineDirection="left"
          mixBlendMode="screen"
        />
      </div>

      {/* Optional overlays for readability (don't block pointer events) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/40 to-black/60 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-16"
          >
            <Shuffle
              text="TechSpark"
              className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white ${pressStart.className}`}
              shuffleDirection="right"
              duration={0.22}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.02}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              tag="h1"
            />

            <motion.div
              className="mb-10 sm:mb-12 flex flex-col items-center gap-2 sm:gap-3 md:gap-4 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {/* Line 1: Location */}
              <div className="flex items-center gap-2 sm:gap-3 text-white/90 text-base sm:text-lg md:text-2xl">
                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                <span className="font-mono"> Seminar Hall </span>
              </div>
              {/* Line 2: Date | Time */}
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-x-8 text-white/90 text-base sm:text-lg md:text-2xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="font-mono">29th September 2025</span>
                </div>
                <span className="hidden md:inline-block h-6 w-px bg-white/30" />
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="font-mono">9:00am</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  boxShadow: [
                    '0 0 0 rgba(153,41,234,0.0)',
                    '0 0 28px rgba(153,41,234,0.45)',
                    '0 0 0 rgba(153,41,234,0.0)'
                  ]
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-xl"
              >
                <Link 
                  href="/register" 
                  className="relative overflow-hidden group text-white px-10 py-4 rounded-2xl text-lg font-semibold flex items-center backdrop-blur-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
                  aria-label="Register Now"
                >
                  {/* Animated border gradient */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl p-[1.5px]"
                    style={{ backgroundImage: 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(147,51,234,0.6), rgba(124,58,237,0.6))', backgroundSize: '300% 300%' }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Inner surface */}
                  <span className="absolute inset-[2px] rounded-[14px] bg-black/30" />
                  {/* Animated gradient fill */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-[2px] rounded-[14px] -z-10"
                    style={{ backgroundImage: 'linear-gradient(90deg, #7c3aed, #9333ea, #7c3aed)', backgroundSize: '220% 220%' }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Shimmer sweep */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute -inset-y-6 -left-24 w-24 rotate-12 bg-white/25 blur-md"
                    animate={{ x: ['0%', '220%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Content */}
                  <span className="relative z-10 flex items-center">
                    Register Now
                    <motion.span
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}