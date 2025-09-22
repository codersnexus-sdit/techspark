'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ShinyButton } from "@/components/ui/shiny-button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

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

  const handleMouseMove = (e: React.MouseEvent, itemName: string) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    if (hoveredItem !== itemName) {
      setHoveredItem(itemName);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
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
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300"></div>
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

              {/* Navigation Menu with Torch Effect */}
              <div 
                ref={navRef}
                className="relative flex items-center bg-gray-900/80 backdrop-blur-md rounded-full px-2 py-2 border border-gray-700/50 overflow-hidden"
                onMouseLeave={handleMouseLeave}
              >
                {/* Torch/Light Effect */}
                {hoveredItem && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: mousePosition.x - 75,
                      top: mousePosition.y - 75,
                      width: '150px',
                      height: '150px',
                      background: `radial-gradient(circle, 
                        rgba(185, 28, 255, 0.4) 0%, 
                        rgba(153, 41, 234, 0.25) 30%, 
                        rgba(180, 255, 57, 0.2) 50%, 
                        transparent 70%
                      )`,
                      borderRadius: '50%',
                      filter: 'blur(20px)',
                      zIndex: 1,
                      transition: 'opacity 50ms ease-out',
                    }}
                  />
                )}
                
                {/* Secondary glow effect */}
                {hoveredItem && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: mousePosition.x - 100,
                      top: mousePosition.y - 100,
                      width: '200px',
                      height: '200px',
                      background: `radial-gradient(circle, 
                        rgba(185, 28, 255, 0.15) 0%, 
                        rgba(153, 41, 234, 0.1) 40%, 
                        transparent 70%
                      )`,
                      borderRadius: '50%',
                      filter: 'blur(30px)',
                      zIndex: 0,
                      transition: 'opacity 50ms ease-out',
                    }}
                  />
                )}

                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    onMouseMove={(e) => handleMouseMove(e, item.name)}
                    className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium px-6 py-2 rounded-full group z-10"
                  >
                    <span                     className={`relative z-10 transition-all duration-100 ${
                      hoveredItem === item.name 
                        ? 'text-white drop-shadow-[0_0_15px_rgba(180,255,57,0.9)]' 
                        : 'group-hover:drop-shadow-[0_0_8px_rgba(153,41,234,0.6)] group-hover:text-[#9929EA]'
                    }`}>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-lg font-bold tracking-tight">
                    Coders Nexus
                  </span>
                  <span className="text-gray-400 text-xs font-medium">
                    SDIT Open Source Community
                  </span>
                </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300 bg-gray-900/50 backdrop-blur-md border border-gray-700/50"
              >
                <Menu size={24} />
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
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center lg:hidden animate-in fade-in duration-300">
            <div className="relative bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">

              {/* Close Button (inside mobile menu) */}
              <button
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300 bg-gray-800/60 border border-gray-700/50 animate-in fade-in slide-in-from-top-2 duration-500 delay-200"
              >
                <X size={20} />
              </button>
              
              {/* Mobile Menu Header */}
              <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <img 
                    src="/assets/logo/logo.svg" 
                    alt="Coders Nexus Logo" 
                    className="w-12 h-12 object-contain animate-in zoom-in-95 duration-500 delay-300"
                  />
                  <span className="text-white text-xl font-bold animate-in slide-in-from-left-4 duration-500 delay-400">Coders Nexus</span>
                </div>
                <span className="text-gray-400 text-sm animate-in fade-in slide-in-from-bottom-2 duration-500 delay-500">SDIT Open Source Community</span>
              </div>

              {/* Menu Items with Mobile Torch Effect */}
              <div className="space-y-2 mb-8">
                {navItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-gray-300 hover:text-white text-lg font-medium transition-all duration-300 py-3 px-6 rounded-xl group relative overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    {/* Mobile hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9929EA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                    
                    <div className="flex items-center justify-center relative z-10">
                      <span className="group-hover:drop-shadow-[0_0_8px_rgba(180,255,57,0.6)] group-hover:text-[#B4FF39] transition-all duration-300">
                        {item.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Mobile Register Button */}
              <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-1000">
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <ShinyButton>Register Now</ShinyButton>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}