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
      `}</style>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto">
          {/* 404 Error Title - Digital glitch distortion with RGB split */}
          <div className="mb-8 relative">
            <div className="relative inline-block">
              {/* Main 404 text - hacker style */}
              <h1 className="text-[15rem] md:text-[20rem] font-bold text-purple-500 mb-4 font-mono relative z-10">
                404
              </h1>
              
              {/* Purple RGB split layer */}
              <div className="absolute top-0 left-0 text-[15rem] md:text-[20rem] font-bold font-mono glitch-purple">
                404
              </div>
              
              {/* Red RGB split layer */}
              <div className="absolute top-0 left-0 text-[15rem] md:text-[20rem] font-bold font-mono glitch-red">
                404
              </div>
              
              {/* Blue RGB split layer */}
              <div className="absolute top-0 left-0 text-[15rem] md:text-[20rem] font-bold font-mono glitch-blue">
                404
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Page Not Found
            </h2>
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto mb-12">
              Oops! The page you're looking for seems to have vanished into the digital void.
            </p>
          </div>

          {/* Action button */}
          <div className="flex justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 group text-lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}