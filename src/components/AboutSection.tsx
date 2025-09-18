// components/AboutSection.tsx
"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-black text-white px-6 sm:px-12 md:px-20 lg:px-32 overflow-hidden">
      {/* Corner Glow Image */}
      <div className="pointer-events-none absolute -right-40 -top-32 w-[720px] h-[720px] opacity-60">
        <Image
          src="/assets/effects/Bg%20Shape-Purple.png"
          alt=""
          fill
          priority
          className="select-none object-contain -scale-x-100"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 w-full"
      >
        {/* Subheading */}
        <p className="text-sm md:text-base text-[#8b5cf6] font-medium mb-3">
          Coders Nexus
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          About
          <motion.span
            className="text-red-500 inline-block align-baseline ml-1 text-4xl md:text-5xl"
            animate={{ opacity: [1, 0.25, 1], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            .
          </motion.span>
        </h2>

        {/* Paragraph */}
        <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-10 max-w-7xl">
          Join us for an exciting 24-hours offline hackathon at Srinivas University Institute of Engineering and Technology (SUIET), organized by the Webflow Community, from October 19–21, 2024. The event kicks off with two workshops on October 19, covering essential tech stacks, followed by a hack session starting at 10 AM on October 20. Participants will work on company-funded or open-themed problem statements, progressing through design, development, and final presentations. Judges will evaluate projects based on innovation, functionality, presentation skills, business viability, and more. With themes suitable for all skill levels, this is a fantastic opportunity for creativity and collaboration!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#9333ea] text-white font-medium shadow-md hover:opacity-90 transition"
          >
            Download Hackathon Rulebook
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>

          <a
            href="register"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#a855f7] text-white font-medium hover:bg-[#a855f7]/10 transition"
          >
            Register Now
          </a>
        </div>
      </motion.div>
    </section>
  );
}
