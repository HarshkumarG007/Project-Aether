import React from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Activity, BrainCircuit, Cpu, Network } from 'lucide-react';

const AiLabWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  if (activeWindow !== 'ailab') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] z-30 flex flex-col bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-aether-green">
          <BrainCircuit size={14} />
          <span>NEURAL_CORE // DIAGNOSTICS</span>
        </div>
        <button onClick={() => toggleWindow('ailab')} className="text-red-400 hover:text-red-300">
          <X size={14} />
        </button>
      </div>

      {/* Dashboard Grid */}
      <div className="flex-1 p-6 grid grid-cols-2 gap-6 overflow-y-auto font-mono text-sm">
        
        {/* Module 1: Moodies™ Engine */}
        <div className="border border-white/10 bg-white/5 p-4 rounded-lg flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-aether-green to-transparent"></div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs tracking-widest">MOODIES™ ENGINE</span>
            <Activity size={14} className="text-aether-green animate-pulse" />
          </div>
          <div className="space-y-2 text-[10px] text-gray-400">
            <div className="flex justify-between"><span>SENTIMENT_ANALYSIS</span> <span className="text-white">ONLINE</span></div>
            <div className="flex justify-between"><span>EMOTION_VECTORS</span> <span className="text-white">ACTIVE</span></div>
            <div className="flex justify-between"><span>LATENCY</span> <span className="text-aether-green">24ms</span></div>
          </div>
        </div>

        {/* Module 2: Hardware Telemetry */}
        <div className="border border-white/10 bg-white/5 p-4 rounded-lg flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs tracking-widest">LOCAL COMPUTE</span>
            <Cpu size={14} className="text-blue-400" />
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-gray-400">RTX 4060 VRAM</span>
                <span className="text-blue-400">6.2 / 8 GB</span>
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-[75%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-gray-400">i7 CPU USAGE</span>
                <span className="text-blue-400">42%</span>
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-[42%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Module 3: Active Training Pipeline */}
        <div className="col-span-2 border border-white/10 bg-white/5 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xs tracking-widest">ROBOTICS KINEMATICS & ML PIPELINE</span>
            <Network size={14} className="text-purple-400" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2 text-[10px] text-gray-400">
              <div className="flex justify-between"><span>EPOCH</span> <span className="text-white">1,402 / 5,000</span></div>
              <div className="flex justify-between"><span>LOSS</span> <span className="text-white">0.0241</span></div>
              <div className="flex justify-between"><span>ACCURACY</span> <span className="text-purple-400">97.8%</span></div>
            </div>
            <div className="flex-1 border-l border-white/10 pl-4 flex flex-col justify-end">
               {/* Simulated Data Graph using basic CSS blocks */}
               <div className="flex items-end gap-1 h-12 opacity-80">
                 {[40, 20, 60, 30, 80, 50, 90, 70, 100, 60].map((h, i) => (
                   <div key={i} className="w-full bg-purple-400/50 hover:bg-purple-400 transition-colors" style={{ height: `${h}%` }}></div>
                 ))}
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiLabWindow;