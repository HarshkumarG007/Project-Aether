import React from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Layers, Palette } from 'lucide-react';

const DesignDistrictWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  if (activeWindow !== 'design') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[700px] h-[75vh] md:h-[500px] z-30 flex flex-col bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-in pointer-events-auto">
      
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[100%] bg-blue-500/30 rounded-full blur-[100px] animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute bottom-[-50%] right-[-20%] w-[100%] h-[100%] bg-purple-500/30 rounded-full blur-[100px] animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute top-[20%] left-[40%] w-[50%] h-[50%] bg-aether-green/20 rounded-full blur-[80px] animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3 text-xs font-mono text-white">
          <Palette size={16} className="text-purple-400" />
          <span className="tracking-widest">DESIGN_DISTRICT // GLASSMORPHISM</span>
        </div>
        <button onClick={() => toggleWindow('design')} className="text-gray-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Showcase Body */}
      <div className="relative flex-1 p-6 md:p-8 flex flex-col items-center justify-center gap-8 overflow-y-auto">
        
        <div className="text-center max-w-lg mb-4">
          <h2 className="text-2xl font-light text-white mb-2">Liquid CSS & Aurora Effects</h2>
          <p className="text-sm text-gray-300 font-light leading-relaxed">
            This module demonstrates advanced frontend styling using Tailwind CSS, focusing on heavily layered backdrops, animated gradients, and complex shadow/blur intersections to create a premium "glass" aesthetic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Card 1: Frosted */}
          <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Layers size={24} className="text-blue-400 mb-4" />
            <h3 className="text-white text-lg mb-2">Frosted Glass</h3>
            <p className="text-xs text-gray-400">Backdrop-blur with low-opacity white fills and precise borders to mimic physical frosted glass.</p>
          </div>

          {/* Card 2: Liquid Neon */}
          <div className="group relative p-6 rounded-2xl bg-black/40 border border-purple-500/30 hover:border-purple-500/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500 cursor-pointer overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[40px] group-hover:bg-purple-500/40 transition-colors duration-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <SparklesIcon size={24} className="text-purple-400 mb-4" />
            <h3 className="text-white text-lg mb-2">Neon Bleed</h3>
            <p className="text-xs text-gray-400">Deep black backgrounds contrasted with highly blurred, saturated neon accents for a cyberpunk feel.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

// Quick Sparkles Icon helper
const SparklesIcon = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path>
  </svg>
);

export default DesignDistrictWindow;
