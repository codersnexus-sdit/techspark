// components/AboutSection.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
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
    <section className="relative min-h-screen flex items-center bg-black text-white px-6 sm:px-12 md:px-20 lg:px-32 overflow-hidden">
      {/* Corner Glow Image */}
      <div className="pointer-events-none absolute -right-40 -top-32 w-[720px] h-[720px] opacity-60">
        <Image
          key={windowSize.width} // Add key to force re-render on resize
          src="/assets/effects/Bg%20Shape-Purple.png"
          alt=""
          fill
          priority
          className="select-none object-contain -scale-x-100"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Subheading */}
        <motion.p 
          className="text-lg md:text-xl text-[#8b5cf6] font-medium mb-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
            transition: { duration: 0.3 }
          }}
        >
          Techspark
        </motion.p>

        {/* Heading */}
        <motion.h2 
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ 
            scale: 1.02,
            textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
            transition: { duration: 0.3 }
          }}
        >
          About
          <motion.span
            className="text-red-500 inline-block align-baseline ml-1 text-5xl md:text-6xl lg:text-7xl"
            animate={{ opacity: [1, 0.25, 1], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ 
              scale: 1.2,
              textShadow: "0 0 20px rgba(239, 68, 68, 0.8)",
              transition: { duration: 0.2 }
            }}
          >
            .
          </motion.span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-12 max-w-7xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ 
            scale: 1.01,
            textShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
            transition: { duration: 0.3 }
          }}
        >
          The{" "}
          <motion.span 
            className="text-[#8b5cf6] font-semibold"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.1,
              textShadow: "0 0 15px rgba(139, 92, 246, 0.6)",
              transition: { duration: 0.2 }
            }}
          >
            Techspark
          </motion.span>{" "}
          will be held on <motion.span 
            className="font-semibold"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.1,
              textShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
              transition: { duration: 0.2 }
            }}
          >
            29th September
          </motion.span>{" "}
          and is open to individual participants or teams of up to two members. The
          competition will begin with an aptitude and coding basics round,
          followed by a debugging challenge, and will conclude with a final
          coding showdown for the top performers. This structured format ensures
          a fair and engaging experience, providing every participant the chance
          to test their knowledge, showcase their skills, and compete for top
          honors in a competitive yet collaborative environment.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.a
            href="/assets/brochure/Brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white font-semibold text-lg shadow-md hover:opacity-90 transition"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(124, 58, 237, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Download Event Brouchure
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="ml-2 w-6 h-6" />
            </motion.div>
          </motion.a>

          <motion.a
            href="register"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-[#a855f7] text-white font-semibold text-lg hover:bg-[#a855f7]/10 transition"
            whileHover={{ scale: 1.05, borderColor: "#8b5cf6", backgroundColor: "rgba(168, 85, 247, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}