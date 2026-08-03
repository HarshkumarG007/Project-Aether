import React from 'react';
import { Terminal, Cpu, Database, Network } from 'lucide-react';
import { useAetherStore } from '../../store/useAetherStore';

const CommandCenter = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto w-[95%] md:w-auto">
      <div className="flex items-center gap-2 md:gap-6 px-4 md:px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-all hover:bg-white/10 overflow-x-auto justify-start md:justify-center custom-scrollbar">
        
        {/* 1. Terminal */}
        <HudButton 
          icon={<Terminal size={20} />} 
          label="TERMINAL" 
          active={activeWindow === 'terminal'} 
          onClick={() => toggleWindow('terminal')}
        />
        <div className="w-px h-8 bg-white/20"></div>
        
        {/* 2. AI Lab */}
        <HudButton 
          icon={<Cpu size={20} />} 
          label="AI LAB" 
          active={activeWindow === 'ailab'} 
          onClick={() => toggleWindow('ailab')}
        />
        <div className="w-px h-8 bg-white/20"></div>
        
        {/* 3. Projects */}
        <HudButton 
          icon={<Database size={20} />} 
          label="PROJECTS" 
          active={activeWindow === 'projects'} 
          onClick={() => toggleWindow('projects')}
        />
        <div className="w-px h-8 bg-white/20"></div>
        
        {/* 4. Network */}
        <HudButton 
          icon={<Network size={20} />} 
          label="NETWORK" 
          active={activeWindow === 'network'} 
          onClick={() => toggleWindow('network')}
        />
      </div>
    </div>
  );
};

const HudButton = ({ icon, label, active = false, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 group transition-colors duration-300 ${active ? 'text-aether-green' : 'text-gray-400 hover:text-white'}`}
    >
      <div className={`p-2 rounded-lg transition-all duration-300 ${active ? 'bg-aether-green/10 shadow-[0_0_10px_rgba(0,255,65,0.3)]' : 'group-hover:bg-white/5'}`}>
        {icon}
      </div>
      <span className="text-[9px] font-mono tracking-widest">{label}</span>
    </button>
  );
};

export default CommandCenter;