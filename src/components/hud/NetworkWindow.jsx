import React from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Globe, Briefcase, Code, Mail, Download, Fingerprint } from 'lucide-react';

const NetworkWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  if (activeWindow !== 'network') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] z-30 flex flex-col bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-white">
          <Fingerprint size={14} className="text-aether-green" />
          <span>USER_IDENTITY // CONTACT_MATRIX</span>
        </div>
        <button onClick={() => toggleWindow('network')} className="text-red-400 hover:text-red-300">
          <X size={14} />
        </button>
      </div>

      {/* Profile Body */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
        
        {/* Holographic Avatar Box */}
        <div className="relative w-24 h-24 mb-4 border border-aether-green/50 bg-aether-green/5 rounded-lg overflow-hidden flex items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-aether-green/80 shadow-[0_0_10px_#00ff41] animate-[scan_2s_ease-in-out_infinite]"></div>
          <Fingerprint size={40} className="text-aether-green/60" />
        </div>

        {/* Identity Data */}
        {/* Identity Data */}
        <h2 className="text-xl font-mono text-white tracking-widest mb-1 uppercase">Harsh Kumar Gupta</h2>
        <p className="text-xs font-mono text-aether-green tracking-widest mb-6 uppercase">AI & ROBOTICS SPECIALIST / AI-ML ENGINEER</p>

        {/* Links Grid */}
        <div className="grid grid-cols-4 gap-4 w-full px-8">
          <SocialNode icon={<Globe size={18} />} label="GITHUB" link="#" />
          <SocialNode icon={<Briefcase size={18} />} label="LINKEDIN" link="#" />
          <SocialNode icon={<Code size={18} />} label="HACKERRANK" link="#" />
          <SocialNode icon={<Mail size={18} />} label="EMAIL" link="#" />
        </div>

        {/* Resume Download Action */}
        <button className="mt-8 flex items-center gap-2 px-6 py-2 border border-white/20 bg-white/5 hover:bg-white/10 hover:border-aether-green transition-all duration-300 rounded font-mono text-xs tracking-widest text-white group">
          <Download size={14} className="group-hover:text-aether-green transition-colors" />
          DOWNLOAD_RESUME.PDF
        </button>
      </div>
    </div>
  );
};

// Reusable micro-component for the social buttons
const SocialNode = ({ icon, label, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noreferrer"
    className="flex flex-col items-center gap-2 group cursor-pointer"
  >
    <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 rounded-lg group-hover:border-blue-400 group-hover:bg-blue-400/10 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
      <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
        {icon}
      </div>
    </div>
    <span className="text-[8px] font-mono tracking-widest text-gray-500 group-hover:text-blue-300 transition-colors">
      {label}
    </span>
  </a>
);

export default NetworkWindow;