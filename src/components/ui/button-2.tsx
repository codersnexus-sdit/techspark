'use client'; 
import { useRef, useState } from 'react';

type ButtonProps = {
  label?: string;
};

export const Component = ({ label = "Register Now" }: ButtonProps) => {
  const divRef = useRef<HTMLButtonElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <button
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(1); }}
      onBlur={() => { setIsFocused(false); setOpacity(0); }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative inline-flex w-fit h-12 items-center justify-center overflow-hidden rounded-full border-2 dark:border-[#9929EA] border-[#E2CBFF] 
      bg-gradient-to-r dark:from-[#1a0b2e] dark:to-[#2d0f4a] from-[#b84fff] to-[#7c1fff] 
      px-6 font-medium text-white shadow-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-50"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, #9929EA88, #00000026)`,
        }}
      />
      <span className="relative z-20">{label}</span>
    </button>
  );
};
