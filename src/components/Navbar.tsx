'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ShinyButton } from "@/components/ui/shiny-button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Map', href: '#map' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' 
          : 'bg-transparent'
      }`}>
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-24">
              
              {/* Logo Section */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <img 
                    src="/assets/logo/logo.svg" 
                    alt="Coders Nexus Logo" 
                    className="w-20 h-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B4FF39] to-[#9929EA] opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xl font-bold tracking-tight">
                    Coders Nexus
                  </span>
                  <span className="text-gray-400 text-sm font-medium">
                    SDIT Open Source Community
                  </span>
                </div>
              </Link>

              {/* Navigation Menu */}
              <div className="flex items-center bg-gray-900/80 backdrop-blur-md rounded-full px-2 py-2 border border-gray-700/50">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium px-6 py-2 rounded-full group"
                  >
                    <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(153,41,234,0.6)] group-hover:text-[#9929EA] transition-all duration-300">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Register Button */}
              <Link href="/register">
                <ShinyButton>Register Now</ShinyButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              
              {/* Mobile Logo */}
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <img 
                    src="/assets/logo/logo.svg" 
                    alt="Coders Nexus Logo" 
                    className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-lg font-bold tracking-tight">
                    Coders Nexus
                  </span>
                  <span className="text-gray-400 text-xs font-medium">
                    SDIT OSC
                  </span>
                </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300 bg-gray-900/50 backdrop-blur-md border border-gray-700/50"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center lg:hidden">
            <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl max-w-sm w-full mx-4">
              
              {/* Mobile Menu Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <img 
                    src="/assets/logo/logo.svg" 
                    alt="Coders Nexus Logo" 
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-white text-xl font-bold">Coders Nexus</span>
                </div>
                <span className="text-gray-400 text-sm">SDIT Open Source Community</span>
              </div>

              {/* Menu Items */}
              <div className="space-y-2 mb-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block text-gray-300 hover:text-white text-lg font-medium transition-all duration-300 py-3 px-6 rounded-xl group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="group-hover:drop-shadow-[0_0_8px_rgba(153,41,234,0.6)] group-hover:text-[#9929EA] transition-all duration-300">
                        {item.name}
                      </span>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Mobile Register Button */}
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <ShinyButton>Register Now</ShinyButton>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
