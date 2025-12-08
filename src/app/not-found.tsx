"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black z-0"></div>

      <style jsx>{`
        @keyframes glitch-purple {
          0% { transform: translate(0); }
          25% { transform: translate(-3px, 3px); }
          50% { transform: translate(0); }
          75% { transform: translate(3px, -3px); }
          100% { transform: translate(0); }
        }
        
        @keyframes glitch-red {
          0% { transform: translate(0); }
          33% { transform: translate(3px, -3px); }
          66% { transform: translate(-3px, 3px); }
          100% { transform: translate(0); }
        }
        
        @keyframes glitch-blue {
          0% { transform: translate(0); }
          50% { transform: translate(-2px, 2px); }
          100% { transform: translate(0); }
        }
        
        .glitch-purple {
          animation: glitch-purple 4s infinite;
          color: #8000ff;
          opacity: 0.7;
        }
        
        .glitch-red {
          animation: glitch-red 5s infinite;
          color: #ff0033;
          opacity: 0.6;
        }
        
        .glitch-blue {
          animation: glitch-blue 6s infinite;
          color: #0066ff;
          opacity: 0.5;
        }
        
        /* Responsive adjustments for smaller screens */
        @media (max-width: 768px) {
          .responsive-404 {
            font-size: 8rem !important;
          }
          
          .responsive-title {
            font-size: 2rem !important;
          }
          
          .responsive-description {
            font-size: 1.25rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-404 {
            font-size: 6rem !important;
          }
          
          .responsive-title {
            font-size: 1.5rem !important;
          }
          
          .responsive-description {
            font-size: 1rem !important;
          }
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto w-full">
          {/* 404 Error Title - Digital glitch distortion with RGB split */}
          <div className="mb-8 relative">
            <div className="relative inline-block">
              {/* Main 404 text - hacker style */}
              <h1 className="text-[6rem] xs:text-[8rem] sm:text-[12rem] md:text-[15rem] lg:text-[20rem] font-bold text-purple-500 mb-4 font-mono relative z-10 responsive-404">
                404
              </h1>
              
              {/* Purple RGB split layer */}
              <div className="absolute top-0 left-0 text-[6rem] xs:text-[8rem] sm:text-[12rem] md:text-[15rem] lg:text-[20rem] font-bold font-mono glitch-purple responsive-404">
                404
              </div>
              
              {/* Red RGB split layer */}
              <div className="absolute top-0 left-0 text-[6rem] xs:text-[8rem] sm:text-[12rem] md:text-[15rem] lg:text-[20rem] font-bold font-mono glitch-red responsive-404">
                404
              </div>
              
              {/* Blue RGB split layer */}
              <div className="absolute top-0 left-0 text-[6rem] xs:text-[8rem] sm:text-[12rem] md:text-[15rem] lg:text-[20rem] font-bold font-mono glitch-blue responsive-404">
                404
              </div>
            </div>
            
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 responsive-title">
              Page Not Found
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-12 responsive-description">
              Oops! The page you're looking for seems to have vanished into the digital void.
            </p>
          </div>

          {/* Action button */}
          <div className="flex justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 group text-base sm:text-lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}