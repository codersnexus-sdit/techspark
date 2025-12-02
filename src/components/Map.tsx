"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Map = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="w-full flex flex-col items-center md:px-0 px-5">
      {/* Location Title */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            transition: { duration: 0.3 }
          }}
        >
          Location
        </motion.h2>
        <motion.p 
          className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
            transition: { duration: 0.3 }
          }}
        >
          Find us at Shree Devi Institute Of Technology
        </motion.p>
      </motion.div>
      
      {/* Map iframe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          transition: { duration: 0.3 }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
        className="w-[90%]"
      >
        <motion.iframe
          key={windowSize.width}
          id="map-iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3126815567234!2d74.86919929999999!3d12.951832699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba350d45819abf1%3A0xec9cf13e2e0ad60c!2sShree%20Devi%20Institute%20Of%20Technology!5e1!3m2!1sen!2sin!4v1758221792297!5m2!1sen!2sin"
          width="100%"
          height="350"
          className="rounded-xl shadow-2xl border border-gray-700"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          viewport={{ once: true }}
        />
      </motion.div>
    </main>
  );
};

export default Map;