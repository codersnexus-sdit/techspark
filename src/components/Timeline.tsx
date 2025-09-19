"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const TimelineSection = () => {
  const timelineEvents = [
    {
      title: "Registration Opens",
      date: "18 September, 2025",
      description: "Register Now",
      status: "completed",
      color: "text-purple-400"
    },
    {
      title: "Registration Closes",
      date: "30 September, 2025", 
      description: "Online registration will be closed and spot Registration will be available",
      status: "upcoming",
      color: "text-yellow-400"
    },
    {
      title: "Registration & Inauguration",
      date: "29 September, 2025 | 8:30am - 9:45am",
      description: "Event begins with registration and check-in from 8:30am to 9:30am, followed by an inspiring inauguration ceremony and welcome address from 9:15am to 9:45am.",
      status: "upcoming",
      color: "text-yellow-400"
    },
    {
      title: "Round 1 - Aptitude & Coding",
      date: "29 September, 2025 | 10:00am - 11:15am",
      description: "Participants will face aptitude tests and basic coding questions from 10:00am to 11:00am. Top 50% performers will advance to the next round, with results announced by 11:15am.",
      status: "upcoming",
      color: "text-yellow-400"
    },
    {
      title: "Round 2 - Error Debugging",
      date: "29 September, 2025 | 11:20am - 12:50pm",
      description: "Selected teams will debug small code snippets from 11:20am to 12:45pm. Only 6-8 top teams based on scores and first-come-first-serve basis will qualify for the finals. Winners announced at 12:50pm.",
      status: "upcoming",
      color: "text-yellow-400"
    },
    {
      title: "Lunch Break",
      date: "29 September, 2025 | 12:50pm - 1:30pm",
      description: "Take a well-deserved break and refuel with lunch from 12:50pm to 1:30pm. Network with fellow participants and prepare for the final challenge ahead.",
      status: "upcoming",
      color: "text-yellow-400"
    },
    {
      title: "Round 3 - Final Round",
      date: "29 September, 2025 | 1:40pm - 3:10pm",
      description: "The ultimate showdown begins! Final qualifying teams will compete in the most challenging round from 1:40pm to 3:10pm to determine the champions.",
      status: "upcoming",
      color: "text-yellow-400"
    },
    {
      title: "Results & Closing",
      date: "29 September, 2025 | 3:45pm - 4:15pm",
      description: "The event concludes with comprehensive feedback from judges, detailed event report presentation, heartfelt vote of thanks, and the much-awaited results announcement from 3:45pm to 4:15pm.",
      status: "upcoming",
      color: "text-yellow-400"
    }
  ];

  return (
    <section className="relative min-h-screen bg-black text-white px-6 sm:px-12 md:px-20 lg:px-32 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-black" />
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Event
            <span className="text-purple-500"> Timeline</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-500 via-purple-400 to-transparent"></div>
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content Card */}
                    <motion.div 
                      className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="transition-all duration-300">
                        <motion.h3 
                          className="text-xl md:text-2xl font-bold text-white mb-2"
                          whileHover={{ color: "#a855f7" }}
                        >
                          {event.title}
                        </motion.h3>
                        <p className="text-purple-400 font-medium mb-3">{event.date}</p>
                        <p className="text-gray-300 leading-relaxed">{event.description}</p>
                      </div>
                    </motion.div>

                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <motion.div 
                        className={`w-4 h-4 rounded-full ${
                          event.status === 'completed' 
                            ? 'bg-purple-500' 
                            : 'bg-yellow-400'
                        } shadow-lg border-2 border-black`}
                        whileHover={{ scale: 1.2 }}
                        animate={event.status === 'upcoming' ? {
                          boxShadow: [
                            "0 0 0 0 rgba(251, 191, 36, 0.4)",
                            "0 0 0 10px rgba(251, 191, 36, 0)",
                          ]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: event.status === 'upcoming' ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                      </motion.div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="w-5/12"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;